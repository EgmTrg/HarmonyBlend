// Bir yedeği yerel Neon veritabanına geri yükler. MEVCUT VERİNİN ÜZERİNE YAZAR.
//
//   npm run db:restore -- backups/full/hb-full-....dump --yes
//   npm run db:restore -- backups/master/hb-master-....dump --yes
//
// Her geri yüklemeden önce otomatik olarak mevcut durumun tam yedeği alınır.
//  - full:   şema + veri birlikte geri gelir (pg_restore --clean).
//  - master: şema yoksa drizzle/ migration'ları uygulanır, tüm uygulama
//            tabloları boşaltılır, sonra ana veri yüklenir. Sonuç: bayiler,
//            ürünler, kullanıcılar hazır; sipariş/ödeme/cari geçmişi boş.
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { CONTAINER, PG_CONN, ROOT, backup, docker } from "./db-backup.mjs";

const file = process.argv.slice(2).find((a) => !a.startsWith("--"));
const confirmed = process.argv.includes("--yes");

if (!file || !existsSync(file)) {
  console.error("Kullanım: npm run db:restore -- <yedek dosyası> --yes");
  process.exit(1);
}
const mode = path.basename(file).startsWith("hb-master-") ? "master" : path.basename(file).startsWith("hb-full-") ? "full" : null;
if (!mode) {
  console.error("Dosya adı hb-full-... ya da hb-master-... ile başlamalı.");
  process.exit(1);
}
if (!confirmed) {
  console.error(`Bu işlem veritabanındaki mevcut verinin üzerine yazar (${mode} geri yükleme).`);
  console.error("Devam etmek için komutun sonuna --yes ekleyin.");
  process.exit(1);
}

const psql = (sql) => docker(["exec", CONTAINER, "psql", ...PG_CONN, "-v", "ON_ERROR_STOP=1", "-tAc", sql]).trim();
const appTables = () =>
  psql("select tablename from pg_tables where schemaname = 'public' and tablename <> 'health_check' order by 1")
    .split("\n")
    .filter(Boolean);

try {
  if (appTables().length > 0) {
    console.log("Önce mevcut durumun güvenlik yedeği alınıyor...");
    backup("full");
  }

  const tmp = `/tmp/${path.basename(file)}`;
  docker(["cp", path.resolve(file), `${CONTAINER}:${tmp}`]);
  try {
    if (mode === "full") {
      // pg_restore --clean kullanılamıyor: public şemasını düşürmeye çalışıyor,
      // Neon'un pg_stat_statements eklentisi ve health_check tablosu buna izin vermiyor.
      const existing = appTables();
      if (existing.length > 0) psql(`drop table ${existing.map((t) => `"${t}"`).join(", ")} cascade`);
      const enums = psql(
        "select typname from pg_type t join pg_namespace n on n.oid = t.typnamespace where n.nspname = 'public' and t.typtype = 'e'"
      ).split("\n").filter(Boolean);
      if (enums.length > 0) psql(`drop type ${enums.map((t) => `"${t}"`).join(", ")} cascade`);
      // Dump'taki "CREATE SCHEMA public" girdisi de (şema zaten var) listeden çıkarılır.
      docker(["exec", CONTAINER, "sh", "-c", `pg_restore -l ${tmp} | grep -v 'SCHEMA - public\\|COMMENT - SCHEMA public' > ${tmp}.list`]);
      try {
        docker(["exec", CONTAINER, "pg_restore", ...PG_CONN, "--no-owner", "--exit-on-error", "-L", `${tmp}.list`, tmp]);
      } finally {
        docker(["exec", "-u", "root", CONTAINER, "rm", "-f", `${tmp}.list`]);
      }
    } else {
      if (!appTables().includes("companies")) {
        const migrations = readdirSync(path.join(ROOT, "drizzle")).filter((f) => f.endsWith(".sql")).sort();
        for (const m of migrations) {
          console.log(`Şema uygulanıyor: drizzle/${m}`);
          docker(["cp", path.join(ROOT, "drizzle", m), `${CONTAINER}:/tmp/${m}`]);
          docker(["exec", CONTAINER, "psql", ...PG_CONN, "-v", "ON_ERROR_STOP=1", "-q", "-f", `/tmp/${m}`]);
          docker(["exec", "-u", "root", CONTAINER, "rm", "-f", `/tmp/${m}`]);
        }
      }
      psql(`truncate ${appTables().map((t) => `"${t}"`).join(", ")} restart identity cascade`);
      docker(["exec", CONTAINER, "pg_restore", ...PG_CONN, "--data-only", "--disable-triggers", "--no-owner", "--exit-on-error", tmp]);
    }
  } finally {
    docker(["exec", "-u", "root", CONTAINER, "rm", "-f", tmp]);
  }

  for (const t of ["companies", "brands", "categories", "products", "dealers", "users", "orders"]) {
    console.log(`  ${t.padEnd(12)} ${psql(`select count(*) from "${t}"`)}`);
  }
  console.log(`Geri yükleme tamamlandı (${mode}).`);
} catch (e) {
  console.error(`Geri yükleme başarısız: ${e.stderr?.trim() || e.message}`);
  process.exit(1);
}
