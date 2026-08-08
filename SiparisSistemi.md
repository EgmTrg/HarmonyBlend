Sen kıdemli bir Yazılım Mimarı ve Full-Stack Geliştiricisin. Aşağıda detayları verilen B2B Sipariş ve Bayi Yönetim Sistemi projesi için kapsamlı bir Sistem Mimarisi, Veri Modeli (Database Schema), Fazlandırılmış Proje Yol Haritası ve Teknik İhtiyaç Dokümanı oluşturmanı istiyorum.

### PROJE ÖZETİ
Fabrika/Genel Merkez ile Franchise bayiler arasında ürün sipariş süreçlerini, ödeme kurallarını, cari bakiye tahsilatlarını ve raporlamayı yöneten B2B web tabanlı bir bayi portalı.

---

### TEMEL İŞ GEREKSİNİMLERİ & MİMARİ AÇIKLAMALAR

1. ÇOKLU MARKA VE BAYİ HİYERARŞİSİ (Multi-Tenant & Hierarchical Structure)
   - Ana firma bünyesinde birden fazla "Alt Marka" bulunabilir (Örn: Çatı firma "Tunam", alt markalar "Musluoğlu" ve "Dilim Börek").
   - Her bayi (Franchise), sistemde tanımlı alt markalardan birine veya birden fazlasına sahip olabilir.
   - Her alt markanın kendine ait ürün katalogları, mamülleri, ambalaj ve sarf malzemeleri bulunur. Ürünler markalar arasında aynı isimde/kategoride olabilir ancak stok ve bayi erişim yetkileri marka bazlı ayrışmalıdır.

2. ESNEK ÖDEME VE SİPARİŞ ONAY MEKANİZMASI (Dynamic Checkout & Payment Flow)
   - Firma yöneticileri her bayi veya marka özelinde ödeme yöntemlerini dinamik olarak tanımlayabilmelidir.
   - Ödeme Yöntemleri:
     * Carisel Çalışma (Cari hesap / Açık hesap): Sipariş oluşturulduğunda ödeme almadan doğrudan onay/hazırlık sürecine geçer.
     * Nakit / Kapıda Ödeme: Belirlenen kurallara göre sipariş akışı ilerler.
     * Sanal POS (Kredi Kartı): Siparişin tamamlanması için anında Sanal POS üzerinden ödeme alınması zorunludur.
   - Yönetici konfigürasyonuna göre sipariş oluşturma adımları ve checkout flow değişkenlik göstermelidir.

3. SİPARİŞ DIŞI MÜSTAKİL SANAL POS ÖDEMESİ (Cari Bakiye Tahsilat Modülü)
   - Bayiler herhangi bir siparişe bağlı olmaksızın, mevcut cari borçlarını/bakiyelerini kapatmak veya hesaba avans geçmek amacıyla site üzerinden Sanal POS ile serbest tutarlı ödeme yapabilmelidir.
   - Yapılan bu bağımsız ödemeler sistemde sipariş ödemelerinden ayrı bir "Tahsilat/Cari Hareket" kaydı olarak işlenmelidir.

4. GELİŞMİŞ RAPORLAMA VE ANALİTİK (Reporting Engine)
   - Firma yetkilileri panel üzerinden; Marka, Bayi, Ürün ve Tarih Aralığı filtrelerini kullanarak:
     * Web arayüzü üzerinde dinamik tablolar ve grafiklerle sipariş ve ödeme verilerini görüntüleyebilmelidir.
     * Bu raporları Excel (.xlsx), CSV ve PDF formatlarında dışa aktarabilmelidir (Export).

---

### KURAL VE KISITLAMALAR (ÖNEMLİ KRİTERLER)

- **Veritabanı Altyapısı (Neon DB):** Veritabanı olarak PostgreSQL tabanlı **Neon DB** kullanılacaktır. 
  - *DB Connection String* proje geliştirmesinin **en başında** (veya mimari onaylandıktan hemen sonra tek seferde) tanımlanacaktır. Projenin ortasında veritabanı değiştirme/geçiş işlemi yapılmayacak, tüm şema ve ORM yapılandırması ilk günden Neon DB'ye göre kurulacaktır.
- **Banka / Sanal POS Entegrasyonları:** İlk etapta canlı banka/POS entegrasyonu (Iyzico, Paytr veya banka API'leri) bağlanmayacaktır. Ancak kod mimarisinde, veri tabanı şemasında ve yapılacaklar listesinde (ToDo / RoadMap) POS altyapısı hazır tutulacak, mock/test modülü ile simüle edilecektir.

---

### SENDEN BEKLENEN ÇIKTILAR

Lütfen bu proje için aşağıdaki başlıkları detaylandırarak yanıt ver:

1. Fazlandırılmış Proje Yol Haritası (Phased Development Roadmap):
   - Projeyi mantıksal geliştirme fazlarına böl (Örn: Faz 1: DB & Temel Mimarinin Kurulumu, Faz 2: Marka/Bayi/Ürün Yönetimi, Faz 3: Sipariş & Mock Ödeme Akışı, Faz 4: Raporlama, Faz 5: Canlı Sanal POS Entegrasyonları).

2. Veri Tabanı Mimarısı (Database Schema - Neon DB / PostgreSQL Uyumlu):
   - PostgreSQL/Neon DB uyumlu, Entity-Relationship (ER) mantığına uygun tablo yapıları.
   - `Companies`, `Brands`, `Dealers`, `DealerBrands`, `Categories`, `Products`, `PaymentMethods`, `Orders`, `OrderItems`, `Payments` (Sipariş içi ve sipariş dışı tahsilatları ayıran yapı) vb. ilişkisel tabloların alanları (fields), tipleri ve foreign key bağlarıyla gösterimi.

3. Sipariş & Tahsilat Akış Algoritması (Workflow Logic):
   - Bayi sepeti onaylarken yöneticinin seçtiği ödeme tipine (Cari vs. Sanal POS Mock) göre sipariş durum makinesi (State Machine).
   - Sipariş dışı bağımsız Sanal POS ödemelerinin cari hesaba işlenme akışı.

4. Önerilen Teknoloji Yığını (Tech Stack Strategy):
   - Frontend, Backend, Neon DB ORM (Prisma/Drizzle vb.), Caching, ve Raporlama kütüphaneleri için ölçeklenebilir ve modern teknoloji önerileri.

5. B2B Kullanıcı Arayüzü (UI/UX) / Ekran Mimarisi:
   - Yönetici Paneli ve Bayi Paneli (Sipariş Ekranı, Cari Bakiye & Serbest Ödeme Ekranı, Raporlama Ekranı) için bulunması gereken temel ekranlar ve bileşenler.