# Roadmap Dokümanı — Üretim Hattı

`roadmap.md` bu dokümanın tek kaynağıdır. İçeriği değiştirmek istediğinizde
(yeni faz, yeni tablo satırı, yeni diyagram vb.) sadece bu dosyayı düzenleyin;
PDF ve Word dosyaları elle değil, aşağıdaki komutla üretilir.

## Kurulum (bir kere)

```
cd docs
npm install
```

## Üretmek için

```
npm run build
```

Bu komut sırasıyla:

1. `roadmap.md` içindeki ` ```mermaid ` bloklarını PNG'ye render eder (`assets/diagrams/`)
2. `output/roadmap.pdf` dosyasını üretir
3. `output/roadmap.docx` dosyasını üretir

Sistemde kurulu Chrome veya Edge'i kullanır (indirme yapmaz). Farklı bir
tarayıcı kullanmak isterseniz `CHROME_PATH` ortam değişkenini ayarlayın.

## Sadece tek bir çıktıyı yeniden üretmek için

```
npm run diagrams   # sadece diyagramları yeniden render eder
npm run pdf         # sadece PDF (mevcut diyagram PNG'lerini kullanır)
npm run docx        # sadece Word (mevcut diyagram PNG'lerini kullanır)
```

`roadmap.md` içindeki mermaid diyagramlarını değiştirdiyseniz önce
`npm run diagrams`, sonra `pdf`/`docx` çalıştırın (ya da doğrudan `npm run build`).
