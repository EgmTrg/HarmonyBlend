// Yerel Neon veritabanının yedeğini alır.
//
//   npm run db:backup           -> tam yedek (şema + tüm veri), backups/full/
//   npm run db:backup:master    -> ana veri yedeği (siparişsiz), backups/master/
//
// pg_dump, neon-local compute konteynerinin içinde çalışır (host'ta Postgres
// istemcisi gerekmez); dosya sonra docker cp ile backups/ altına alınır.
// Geri yükleme: scripts/db-restore.mjs
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const CONTAINER = "neon-local-compute1-1";
export const PG_CONN = ["-h", "127.0.0.1", "-p", "55433", "-U", "cloud_admin", "-d", "postgres"];
export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const BACKUP_DIR = path.join(ROOT, "backups");

// Siparişler ve onlara bağlı her şey (kalemler, durum geçmişi, ödemeler,
// cari hareketler), loglar ve şifre sıfırlama tokenları bilerek dışarıda.
// Fiyat/KDV ayrı tablo değil, products üzerinde.
export const MASTER_TABLES = ["companies", "brands", "categories", "products", "dealers", "dealer_brands", "users"];

const MODES = {
  full: { keep: 14, args: ["-n", "public", "-T", "public.health_check"] },
  master: { keep: 10, args: ["--data-only", ...MASTER_TABLES.flatMap((t) => ["-t", `public.${t}`])] },
};

export function docker(args, opts = {}) {
  return execFileSync("docker", args, { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"], ...opts });
}

function timestamp() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}_${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
}

export function backup(mode) {
  const cfg = MODES[mode];
  if (!cfg) throw new Error(`Bilinmeyen yedek türü: ${mode} (full | master)`);

  const dir = path.join(BACKUP_DIR, mode);
  mkdirSync(dir, { recursive: true });
  const name = `hb-${mode}-${timestamp()}.dump`;
  const tmp = `/tmp/${name}`;

  docker(["exec", CONTAINER, "pg_dump", ...PG_CONN, "-Fc", "--no-owner", ...cfg.args, "-f", tmp]);
  try {
    docker(["cp", `${CONTAINER}:${tmp}`, path.join(dir, name)]);
  } finally {
    docker(["exec", "-u", "root", CONTAINER, "rm", "-f", tmp]);
  }

  // Eski yedekleri temizle (isimler zaman damgalı, alfabetik = kronolojik)
  const files = readdirSync(dir).filter((f) => f.startsWith(`hb-${mode}-`) && f.endsWith(".dump")).sort();
  for (const old of files.slice(0, Math.max(0, files.length - cfg.keep))) rmSync(path.join(dir, old));

  const file = path.join(dir, name);
  console.log(`Yedek alındı: ${path.relative(ROOT, file)} (${(statSync(file).size / 1024).toFixed(1)} KB)`);
  return file;
}

function neonRunning() {
  try {
    return docker(["inspect", "-f", "{{.State.Running}}", CONTAINER]).trim() === "true";
  } catch {
    return false; // Docker kapalı ya da konteyner yok
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  // --if-running: zamanlanmış görev için. HB o gün hiç açılmadıysa veritabanı
  // değişmemiştir; Docker'ı başlatmadan sessizce atlanır.
  if (process.argv.includes("--if-running") && !neonRunning()) {
    console.log(`[${new Date().toISOString()}] Neon çalışmıyor, yedek atlandı.`);
    process.exit(0);
  }
  try {
    backup(process.argv[2] ?? "full");
  } catch (e) {
    console.error(`[${new Date().toISOString()}] Yedek alınamadı: ${e.stderr?.trim() || e.message}`);
    console.error("Docker ve neon-local konteynerleri çalışıyor mu?");
    process.exit(1);
  }
}
