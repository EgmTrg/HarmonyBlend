import type { Metadata } from "next";
import { Fraunces, Work_Sans, IBM_Plex_Mono } from "next/font/google";
import { CARD, BUTTON_PRIMARY, badgeClass } from "@/lib/ui";
import { LightboxImage } from "./lightbox-image";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-work-sans",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

const display = { fontFamily: "var(--font-fraunces)" };
const mono = { fontFamily: "var(--font-plex-mono)" };

export const metadata: Metadata = {
  title: "HarmonyBlend nedir?",
  description: "B2B çok markalı bayi ağı için sipariş, ödeme ve cari hesap yönetim sistemi.",
};

function ShotFrame({
  src,
  alt,
  caption,
  className = "",
}: {
  src: string;
  alt: string;
  caption: string;
  className?: string;
}) {
  return (
    <figure className={`overflow-hidden rounded-2xl border border-border bg-card shadow-sm shadow-black/[0.05] ${className}`}>
      <div className="flex items-center gap-1.5 bg-navy-950 px-3.5 py-2.5">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
      </div>
      <LightboxImage src={src} alt={alt} />
      <figcaption style={mono} className="px-3.5 py-3 text-xs text-ink-400">
        {caption}
      </figcaption>
    </figure>
  );
}

function Feature({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className={CARD}>
      <div className="mb-3.5 flex h-9 w-9 items-center justify-center rounded-lg bg-accent-50 text-accent-600">
        {icon}
      </div>
      <h3 className="mb-1.5 text-[15.5px] font-semibold text-ink-900">{title}</h3>
      <p className="text-sm leading-relaxed text-ink-600">{children}</p>
    </div>
  );
}

function Journey({ n, label, sub, first = false }: { n: string; label: string; sub: string; first?: boolean }) {
  return (
    <div>
      <p style={mono} className="mb-2.5 text-xs text-accent-600">
        {n}
      </p>
      <div className={`mb-3.5 h-0.5 ${first ? "bg-accent-500" : "bg-border"}`} />
      <p className="text-sm font-semibold text-ink-900">{label}</p>
      <p className="mt-1 text-xs text-ink-400">{sub}</p>
    </div>
  );
}

export default function HakkindaPage() {
  return (
    <div
      className={`${fraunces.variable} ${workSans.variable} ${plexMono.variable} min-h-dvh bg-background text-ink-900`}
      style={{ fontFamily: "var(--font-work-sans)" }}
    >
      <div className="mx-auto max-w-5xl px-5">
        <div className="flex items-center justify-between border-b border-border py-5">
          <div className="flex items-center gap-2.5 text-[15px] font-semibold text-ink-900">
            <span style={display} className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-600 text-[14px] font-semibold text-white">
              H
            </span>
            Harmony<span className="text-accent-600">Blend</span>
          </div>
          <span style={mono} className="text-xs text-ink-400">
            Ürün Tanıtımı
          </span>
        </div>

        {/* Hero */}
        <section className="grid gap-10 py-16">
          <div className="max-w-2xl">
            <p style={mono} className="mb-3 text-xs uppercase tracking-[0.14em] text-accent-600">
              B2B Sipariş &amp; Bayi Yönetim Sistemi
            </p>
            <h1 style={display} className="text-balance text-[clamp(32px,5.2vw,54px)] font-medium leading-[1.1] tracking-tight text-ink-900">
              Bayi ağınızı <span className="text-accent-600">tek panelden</span> yönetin.
            </h1>
            <p className="mt-5 max-w-[56ch] text-[17px] leading-relaxed text-ink-600">
              Fabrikanız ile bayileriniz arasındaki sipariş, ödeme ve cari hesap trafiğini tek
              bir sisteme taşıyın. Telefon, WhatsApp ve dağınık Excel dosyalarının yerini,
              uçtan uca izlenebilir bir panel alır.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <span className={BUTTON_PRIMARY}>Bugün kullanılabilir bir sistem →</span>
              <span className="inline-flex items-center rounded-lg border border-border px-4 py-2 text-sm font-medium text-ink-600">
                Çok markalı, çok bayili yapı için tasarlandı
              </span>
            </div>
          </div>
          <ShotFrame
            src="/screenshots/giris-ekrani.jpg"
            alt="HarmonyBlend giriş ekranı"
            caption="Firma kodunuzla giriş — her firma kendi markalarını ve bayilerini görür"
            className="mx-auto w-full max-w-3xl"
          />
        </section>

        {/* Problem */}
        <section className="border-t border-border py-14">
          <p style={mono} className="mb-2.5 text-xs uppercase tracking-[0.1em] text-ink-400">
            Hangi Sorunu Çözüyor?
          </p>
          <h2 style={display} className="max-w-xl text-balance text-[clamp(24px,3.2vw,32px)] font-medium text-ink-900">
            Bayi ağı büyüdükçe dağınıklık da büyür.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 opacity-80">
              <h3 style={mono} className="mb-3.5 text-xs uppercase tracking-[0.06em] text-ink-400">
                Bugün, HarmonyBlend olmadan
              </h3>
              <ul className="flex flex-col gap-2.5 text-sm text-ink-600">
                <li>Siparişler telefonla/WhatsApp&apos;la dağınık şekilde geliyor</li>
                <li>Bayi, güncel bakiyesini öğrenmek için her seferinde merkezi aramak zorunda kalıyor</li>
                <li>Hangi bayinin hangi ürüne yöneldiği, hangisini satamadığı belirsiz kalıyor</li>
                <li>Büyüme ile hata payı katlanarak artıyor</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-accent-500/40 bg-accent-50/60 p-6">
              <h3 style={mono} className="mb-3.5 text-xs uppercase tracking-[0.06em] text-accent-700">
                HarmonyBlend ile
              </h3>
              <ul className="flex flex-col gap-2.5 text-sm text-ink-900">
                <li className="flex gap-2"><span className="text-success-fg">✓</span>Bayi kendi panelinden sipariş verir, siz tek yerden onaylarsınız</li>
                <li className="flex gap-2"><span className="text-success-fg">✓</span>Cari bakiye, borç/alacak otomatik ve her an güncel</li>
                <li className="flex gap-2"><span className="text-success-fg">✓</span>Marka, bayi ve sipariş verisi tek bir ekranda</li>
                <li className="flex gap-2"><span className="text-success-fg">✓</span>Yeni marka/bayi eklemek bir form doldurmaktan ibaret</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Journey */}
        <section className="border-t border-border py-14">
          <p style={mono} className="mb-2.5 text-xs uppercase tracking-[0.1em] text-ink-400">
            Nasıl Çalışıyor?
          </p>
          <h2 style={display} className="max-w-xl text-balance text-[clamp(24px,3.2vw,32px)] font-medium text-ink-900">
            Bir siparişin baştan sona yolculuğu — her adım kayıtlı.
          </h2>
          <div className="mt-9 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
            <Journey n="01" label="Sipariş verilir" sub="Bayi panelinden" first />
            <Journey n="02" label="Onaylanır" sub="Merkez panelinden" />
            <Journey n="03" label="Hazırlanır" sub="Depo/üretim" />
            <Journey n="04" label="Sevk edilir" sub="Dağıtım" />
            <Journey n="05" label="Teslim edilir" sub="Bayiye ulaşır" />
            <Journey n="06" label="Cari güncellenir" sub="Ödeme/bakiye" />
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-border py-14">
          <p style={mono} className="mb-2.5 text-xs uppercase tracking-[0.1em] text-ink-400">
            Öne Çıkan Özellikler
          </p>
          <h2 style={display} className="max-w-xl text-balance text-[clamp(24px,3.2vw,32px)] font-medium text-ink-900">
            Tek sistemde, uçtan uca.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Feature title="Marka &amp; Bayi Yönetimi" icon={<IconBrand />}>
              Birden fazla alt markayı tanımlayın, her bayiyi kendi markasına/markalarına
              bağlayın. Bayi yalnızca kendisine açık kataloğu görür.
            </Feature>
            <Feature title="Sipariş &amp; Ödeme" icon={<IconOrder />}>
              Açık hesap, merkezde ödeme veya sanal POS — hangisinin hangi bayide açık olacağına
              siz karar verirsiniz. Durum her an görünür.
            </Feature>
            <Feature title="Cari Hesap Takibi" icon={<IconLedger />}>
              Her bayinin güncel bakiyesi ve hareket dökümü tek ekstrede. Limit aşıldığında
              açık hesap otomatik kapanır.
            </Feature>
            <Feature title="Görünürlük &amp; Trend" icon={<IconChart />}>
              Merkez ve bayi tarafında aylık sipariş/ciro özeti, en çok satan ürünler — tek
              bakışta genel durum.
            </Feature>
            <Feature title="Her Cihazdan" icon={<IconDevice />}>
              Masaüstü, tablet, telefon — aynı panel, aynı rahatlık. Depoda telefonla da
              kontrol edilebilir.
            </Feature>
            <Feature title="Rol Bazlı Erişim" icon={<IconRole />}>
              Merkez yöneticisi, marka yöneticisi, bayi kullanıcısı — herkes kendi yetkisi
              kadarını görür.
            </Feature>
          </div>
        </section>

        {/* Two panels */}
        <section className="border-t border-border py-14">
          <p style={mono} className="mb-2.5 text-xs uppercase tracking-[0.1em] text-ink-400">
            İki Panel, İki Deneyim
          </p>
          <h2 style={display} className="max-w-xl text-balance text-[clamp(24px,3.2vw,32px)] font-medium text-ink-900">
            Aynı veri, iki ayrı bakış açısı.
          </h2>

          <div className="mt-10 mb-5 flex flex-wrap items-baseline gap-3">
            <span className="rounded-full border border-accent-500 px-3 py-1 text-xs font-medium text-accent-600" style={mono}>
              YÖNETİM PANELİ
            </span>
            <p className="text-sm text-ink-400">Markaları, bayileri ve gelen siparişleri buradan yönetirsiniz.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <ShotFrame className="sm:col-span-2" src="/screenshots/admin-genel-bakis.jpg" alt="Yönetim paneli genel bakış" caption="Genel Bakış — aylık sipariş/ciro trendi ve en çok satan ürünler" />
            <ShotFrame src="/screenshots/admin-markalar-bayiler.jpg" alt="Marka ve bayi yönetimi" caption="Markalar &amp; Bayiler" />
            <ShotFrame src="/screenshots/admin-siparisler.jpg" alt="Sipariş yönetimi" caption="Sipariş Yönetimi" />
            <ShotFrame className="sm:col-span-2" src="/screenshots/admin-cari-ekstre.jpg" alt="Cari hesap ekstresi" caption="Bir bayinin Cari Hesap Ekstresi" />
          </div>

          <div className="mt-12 mb-5 flex flex-wrap items-baseline gap-3">
            <span className="rounded-full border border-success-fg/50 px-3 py-1 text-xs font-medium text-success-fg" style={mono}>
              BAYİ PANELİ
            </span>
            <p className="text-sm text-ink-400">Bayileriniz kendi hesabıyla girer, yalnızca kendi markasını görür.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ShotFrame className="sm:col-span-2 lg:col-span-3" src="/screenshots/dealer-genel-bakis.jpg" alt="Bayi paneli genel bakış" caption="Bayinin kendi Genel Bakış ekranı" />
            <ShotFrame src="/screenshots/dealer-urun-katalogu.jpg" alt="Bayi ürün kataloğu" caption="Ürün Kataloğu" />
            <ShotFrame src="/screenshots/dealer-sepet.jpg" alt="Sepet çekmecesi" caption="Sepet — marka bazlı gruplu, KDV dahil toplam" />
            <ShotFrame src="/screenshots/dealer-checkout.jpg" alt="Sipariş tamamlama ekranı" caption="Ödeme tipine göre dallanan Checkout" />
          </div>
          <div className="mt-4 grid gap-4">
            <ShotFrame src="/screenshots/dealer-siparislerim.jpg" alt="Siparişlerim listesi" caption="Siparişlerim" />
          </div>
        </section>

        {/* Status */}
        <section className="border-t border-border py-14">
          <p style={mono} className="mb-2.5 text-xs uppercase tracking-[0.1em] text-ink-400">
            Dürüst Bir Durum Tablosu
          </p>
          <h2 style={display} className="max-w-xl text-balance text-[clamp(24px,3.2vw,32px)] font-medium text-ink-900">
            Bugün ne var, yakında ne geliyor.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className={CARD}>
              <span className={badgeClass("success")} style={mono}>Bugün hazır</span>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm text-ink-600">
                <li>Çok markalı katalog ve bayi/marka eşleştirmesi</li>
                <li>Sepet → üç ödeme şekliyle sipariş tamamlama</li>
                <li>Sipariş durum takibi ve geçmişi</li>
                <li>Cari bakiye, ekstre, bağımsız bakiye ödemesi</li>
                <li>Aylık özet/trend ekranları</li>
                <li>Mobil &amp; tablet uyumlu arayüz</li>
              </ul>
            </div>
            <div className={CARD}>
              <span className={badgeClass("warning")} style={mono}>Yakında</span>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm text-ink-600">
                <li>Markaya özel sipariş gün/saat kısıtlaması</li>
                <li>Bayi stok sayımı/mutabakatı ekranı</li>
                <li>Gün sonu özeti, dış sipariş girişi</li>
                <li>Bölgesel yetkilendirme, yeni roller</li>
                <li>Talebe özel raporlar</li>
              </ul>
            </div>
            <div className={CARD}>
              <span className={badgeClass("danger")} style={mono}>Şu an kapsam dışı</span>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm text-ink-600">
                <li>Gerçek bankadan canlı tahsilat (şu an test modunda)</li>
                <li>Muhasebe/ERP ile otomatik entegrasyon</li>
                <li>Hazır şablon raporlar</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="border-t border-border py-14">
          <p style={mono} className="mb-7 text-xs uppercase tracking-[0.1em] text-ink-400">
            Neden HarmonyBlend?
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className={CARD}>
              <span style={display} className="mb-2.5 block text-3xl italic text-accent-500">i.</span>
              <h3 className="mb-1.5 text-[15.5px] font-semibold text-ink-900">Dağınıklığın yerini merkez alır</h3>
              <p className="text-sm text-ink-600">Telefon, WhatsApp ve Excel&apos;in dağıttığı bilgi tek bir panelde toplanır.</p>
            </div>
            <div className={CARD}>
              <span style={display} className="mb-2.5 block text-3xl italic text-accent-500">ii.</span>
              <h3 className="mb-1.5 text-[15.5px] font-semibold text-ink-900">Markanız büyüdükçe o da büyür</h3>
              <p className="text-sm text-ink-600">Yeni bir marka veya bayi eklemek bir form doldurmaktan ibarettir.</p>
            </div>
            <div className={CARD}>
              <span style={display} className="mb-2.5 block text-3xl italic text-accent-500">iii.</span>
              <h3 className="mb-1.5 text-[15.5px] font-semibold text-ink-900">Her şey kayıtlı, geriye bakılabilir</h3>
              <p className="text-sm text-ink-600">Kim ne zaman ne yaptı — her sipariş ve ödeme için izlenebilir.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border py-16">
          <p style={mono} className="mb-2.5 text-xs uppercase tracking-[0.1em] text-ink-400">
            İletişim
          </p>
          <h2 style={display} className="max-w-[18ch] text-balance text-[clamp(26px,3.6vw,38px)] font-medium text-ink-900">
            Bu sistemi kendi bayi ağınızda kullanmak ister misiniz?
          </h2>
          <p className="mt-4 max-w-[50ch] text-[15.5px] text-ink-600">
            Bir demo için iletişime geçin — mevcut markalarınız ve bayi yapınızla nasıl
            çalışacağını birlikte görelim.
          </p>
        </section>

        <footer className="flex flex-wrap justify-between gap-2 border-t border-border py-7 text-xs text-ink-400">
          <span>EGMTRG Software and Development · Geliştirici: Egemen Turoğlu</span>
          <span>HarmonyBlend (HB)</span>
        </footer>
      </div>
    </div>
  );
}

function IconBrand() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 7l8-4 8 4-8 4-8-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M4 7v10l8 4 8-4V7" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
function IconOrder() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M3 9h18" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function IconLedger() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 14h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function IconChart() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 19V9M12 19V5M20 19v-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function IconDevice() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="6" y="2" width="12" height="20" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M11 18h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function IconRole() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4L12 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}
