import fs from "fs";
import path from "path";
// pdfkit'in normal girişi Helvetica.afm gibi font metrik dosyalarını fs ile
// paket dışına göreli yoldan okuyor — Next.js bundling'inde bu yol kırılıyor
// (ENOENT). standalone build aynı verileri dosyaya değil koda gömdüğü için
// bundling'den etkilenmiyor.
import PDFDocument from "pdfkit/js/pdfkit.standalone.js";
import { buildCategoryTree, categoryHasItems, type CategoryNode } from "@/lib/category-tree";
import type { OrderDocumentData, OrderDocumentItem } from "@/lib/order-document";

const COLORS = {
  accent: "#5b4bfa",
  accentTint: "#efeeff",
  ink900: "#16182e",
  ink600: "#4b4f6b",
  ink400: "#8a8da8",
  border: "#e7e8f0",
};

// pdfkit fs.readFileSync ile kendi yolunu çözmek yerine buffer bekliyor —
// Next.js'in build/serverless dosya izleyicisinin fontu paketlemesi için
// açık, statik bir yol (process.cwd() bazlı) kullanıyoruz.
const FONT_DIR = path.join(process.cwd(), "src", "lib", "pdf", "fonts");
const REGULAR_FONT = fs.readFileSync(path.join(FONT_DIR, "PTSans-Regular.ttf"));
const BOLD_FONT = fs.readFileSync(path.join(FONT_DIR, "PTSans-Bold.ttf"));
// Standalone pdfkit kendi Buffer polyfill'ini kullandığı için Node Buffer'ını
// tanımıyor ve dosya yolu sanıp fs'e düşüyor — data URI olarak veriyoruz.
const BRAND_MARK = `data:image/png;base64,${fs
  .readFileSync(path.join(process.cwd(), "src", "lib", "pdf", "hb-mark.png"))
  .toString("base64")}`;
const BRAND_MARK_SIZE = 11;

const PAGE_MARGIN = 40;
const COLS = { no: 25, product: 215, sku: 75, quantity: 60, shipped: 70, delivered: 70 };
const COL_X = {
  no: PAGE_MARGIN,
  product: PAGE_MARGIN + COLS.no,
  sku: PAGE_MARGIN + COLS.no + COLS.product,
  quantity: PAGE_MARGIN + COLS.no + COLS.product + COLS.sku,
  shipped: PAGE_MARGIN + COLS.no + COLS.product + COLS.sku + COLS.quantity,
  delivered: PAGE_MARGIN + COLS.no + COLS.product + COLS.sku + COLS.quantity + COLS.shipped,
};
const TABLE_WIDTH = COLS.no + COLS.product + COLS.sku + COLS.quantity + COLS.shipped + COLS.delivered;

const dateFormatter = new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium", timeStyle: "short" });

export async function buildOrdersPdf(orderList: OrderDocumentData[]): Promise<Buffer> {
  const doc = new PDFDocument({ size: "A4", margins: { top: PAGE_MARGIN, bottom: PAGE_MARGIN, left: PAGE_MARGIN, right: PAGE_MARGIN }, bufferPages: true });
  doc.registerFont("Regular", REGULAR_FONT);
  doc.registerFont("Bold", BOLD_FONT);
  doc.font("Regular");

  const chunks: Buffer[] = [];
  doc.on("data", (chunk: Buffer) => chunks.push(chunk));
  const finished = new Promise<Buffer>((resolve) => doc.on("end", () => resolve(Buffer.concat(chunks))));

  orderList.forEach((order, index) => {
    if (index > 0) doc.addPage();
    renderOrder(doc, order);
  });

  if (orderList.length === 0) {
    doc.font("Bold").fontSize(12).fillColor(COLORS.ink600).text("Seçili filtrelerle eşleşen sipariş bulunamadı.", PAGE_MARGIN, PAGE_MARGIN);
  }

  const pageRange = doc.bufferedPageRange();
  for (let i = 0; i < pageRange.count; i++) {
    doc.switchToPage(i);
    // Alt kenar boşluğunun İÇİNE yazıyoruz — pdfkit taşma korumasını
    // devre dışı bırakmazsak bu, boş bir sonraki sayfa daha ekler.
    doc.page.margins.bottom = 0;
    const bottom = doc.page.height - PAGE_MARGIN + 14;
    const footer = `HarmonyBlend — Sayfa ${i + 1} / ${pageRange.count}`;
    doc.font("Regular").fontSize(7.5).fillColor(COLORS.ink400);
    // Amblem + metin birlikte ortalanır
    const footerX = (doc.page.width - (BRAND_MARK_SIZE + 4 + doc.widthOfString(footer))) / 2;
    doc.image(BRAND_MARK, footerX, bottom - 2, { width: BRAND_MARK_SIZE, height: BRAND_MARK_SIZE });
    doc.text(footer, footerX + BRAND_MARK_SIZE + 4, bottom, { lineBreak: false });
  }

  doc.end();
  return finished;
}

function renderOrder(doc: PDFKit.PDFDocument, order: OrderDocumentData) {
  let y = PAGE_MARGIN;

  doc
    .font("Regular")
    .fontSize(8)
    .fillColor(COLORS.ink400)
    .text(order.companyName, PAGE_MARGIN, y, { width: TABLE_WIDTH - 120 })
    .text(dateFormatter.format(new Date()), PAGE_MARGIN + TABLE_WIDTH - 120, y, { width: 120, align: "right" });
  y += 18;

  // Marka küçük bir etiket — asıl vurgu bayi adında: sevkiyat/lojistik
  // personeli dökümanı önce bayi ismiyle tanısın diye, tutarsızlık olmasın.
  doc.font("Bold").fontSize(10).fillColor(COLORS.accent).text(order.brandName.toUpperCase(), PAGE_MARGIN, y);
  y += 16;

  doc.font("Bold").fontSize(19).fillColor(COLORS.ink900);
  const dealerNameHeight = doc.heightOfString(order.dealerName, { width: TABLE_WIDTH });
  doc.text(order.dealerName, PAGE_MARGIN, y, { width: TABLE_WIDTH });
  y += dealerNameHeight + 10;

  doc.font("Bold").fontSize(12).fillColor(COLORS.ink600).text("SİPARİŞ DÖKÜMANI", PAGE_MARGIN, y);
  y += 22;

  const infoLines: [string, string][] = [
    ["Sipariş No", order.id.slice(0, 8).toUpperCase()],
    ["Tarih", dateFormatter.format(order.createdAt)],
  ];
  for (const [label, value] of infoLines) {
    doc.font("Bold").fontSize(9).fillColor(COLORS.ink600).text(`${label}: `, PAGE_MARGIN, y, { continued: true });
    doc.font("Regular").fillColor(COLORS.ink900).text(value);
    y = doc.y + 2;
  }
  y += 8;

  doc.moveTo(PAGE_MARGIN, y).lineTo(PAGE_MARGIN + TABLE_WIDTH, y).strokeColor(COLORS.border).lineWidth(1).stroke();
  y += 16;

  const itemsByCategory = new Map<string, OrderDocumentItem[]>();
  const uncategorized: OrderDocumentItem[] = [];
  for (const item of order.items) {
    if (item.categoryId) {
      const list = itemsByCategory.get(item.categoryId) ?? [];
      list.push(item);
      itemsByCategory.set(item.categoryId, list);
    } else {
      uncategorized.push(item);
    }
  }

  const tree = buildCategoryTree(order.categories);
  for (const node of tree) {
    y = renderCategoryNode(doc, y, node, itemsByCategory, 0);
  }
  if (uncategorized.length > 0) {
    y = ensureSpace(doc, y, 20);
    doc.font("Bold").fontSize(10).fillColor(COLORS.ink900).text("Diğer", PAGE_MARGIN, y);
    y = doc.y + 6;
    y = renderItemTable(doc, y, uncategorized);
  }
}

function renderCategoryNode(
  doc: PDFKit.PDFDocument,
  startY: number,
  node: CategoryNode,
  itemsByCategory: Map<string, OrderDocumentItem[]>,
  depth: number
): number {
  if (!categoryHasItems(node, itemsByCategory)) return startY;

  let y = ensureSpace(doc, startY, 20);
  doc
    .font("Bold")
    .fontSize(depth === 0 ? 10 : 9)
    .fillColor(depth === 0 ? COLORS.ink900 : COLORS.ink600)
    .text(node.name, PAGE_MARGIN + depth * 12, y);
  y = doc.y + 6;

  const ownItems = itemsByCategory.get(node.id) ?? [];
  if (ownItems.length > 0) y = renderItemTable(doc, y, ownItems);

  for (const child of node.children) {
    y = renderCategoryNode(doc, y, child, itemsByCategory, depth + 1);
  }
  return y;
}

function renderItemTable(doc: PDFKit.PDFDocument, startY: number, items: OrderDocumentItem[]): number {
  let y = ensureSpace(doc, startY, 22);
  y = drawTableHeader(doc, y);

  items.forEach((item, index) => {
    const productHeight = doc.font("Regular").fontSize(9).heightOfString(item.productName, { width: COLS.product - 8 });
    const rowHeight = Math.max(20, productHeight + 8);

    if (y + rowHeight > doc.page.height - PAGE_MARGIN) {
      doc.addPage();
      y = PAGE_MARGIN;
      y = drawTableHeader(doc, y);
    }

    if (index % 2 === 1) {
      doc.rect(PAGE_MARGIN, y, TABLE_WIDTH, rowHeight).fill("#fafafc");
    }

    doc.font("Regular").fontSize(9).fillColor(COLORS.ink600);
    doc.text(String(index + 1), COL_X.no + 2, y + 5, { width: COLS.no - 4 });
    doc.fillColor(COLORS.ink900).text(item.productName, COL_X.product + 4, y + 5, { width: COLS.product - 8 });
    doc.fillColor(COLORS.ink400).text(item.sku, COL_X.sku + 4, y + 5, { width: COLS.sku - 8 });
    doc.fillColor(COLORS.ink600).text(`${formatQuantity(item.quantity)} ${item.unit}`, COL_X.quantity + 4, y + 5, {
      width: COLS.quantity - 8,
      align: "right",
    });

    const boxSize = 11;
    const shippedBoxX = COL_X.shipped + COLS.shipped / 2 - boxSize / 2;
    doc.rect(shippedBoxX, y + rowHeight / 2 - boxSize / 2, boxSize, boxSize).strokeColor(COLORS.border).lineWidth(1).stroke();
    const deliveredBoxX = COL_X.delivered + COLS.delivered / 2 - boxSize / 2;
    doc.rect(deliveredBoxX, y + rowHeight / 2 - boxSize / 2, boxSize, boxSize).strokeColor(COLORS.border).lineWidth(1).stroke();

    y += rowHeight;
  });

  y += 6;
  doc
    .font("Bold")
    .fontSize(9)
    .fillColor(COLORS.ink600)
    .text(`Toplam ${items.length} kalem`, COL_X.product, y, { width: COLS.sku + COLS.product });
  return y + 14;
}

function drawTableHeader(doc: PDFKit.PDFDocument, y: number): number {
  doc.rect(PAGE_MARGIN, y, TABLE_WIDTH, 20).fill(COLORS.accentTint);
  doc.font("Bold").fontSize(8.5).fillColor(COLORS.ink600);
  doc.text("#", COL_X.no + 2, y + 6, { width: COLS.no - 4 });
  doc.text("Ürün Adı", COL_X.product + 4, y + 6, { width: COLS.product - 8 });
  doc.text("SKU", COL_X.sku + 4, y + 6, { width: COLS.sku - 8 });
  doc.text("Miktar", COL_X.quantity + 4, y + 6, { width: COLS.quantity - 8, align: "right" });
  doc.text("Sevk", COL_X.shipped, y + 6, { width: COLS.shipped, align: "center" });
  doc.text("Teslim Alınan", COL_X.delivered, y + 6, { width: COLS.delivered, align: "center" });
  return y + 24;
}

function ensureSpace(doc: PDFKit.PDFDocument, y: number, needed: number): number {
  if (y + needed > doc.page.height - PAGE_MARGIN) {
    doc.addPage();
    return PAGE_MARGIN;
  }
  return y;
}

function formatQuantity(value: number) {
  return value % 1 === 0 ? String(value) : value.toLocaleString("tr-TR");
}
