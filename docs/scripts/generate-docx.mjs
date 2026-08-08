import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  ShadingType,
  ImageRun,
  PageBreak,
  VerticalAlign,
} from "docx";
import {
  loadRoadmap,
  replaceMermaidBlocks,
  diagramPngPath,
  OUTPUT_DIR,
} from "./markdown-source.mjs";

const INK = "1A2420";
const INK_SOFT = "4B5750";
const INK_FAINT = "7C877F";
const ACCENT = "1F5F56";
const ACCENT_2 = "A85A26";
const LINE = "D3D9D2";
const SURFACE_2 = "EEF1EF";
const CODE_BG = "182420";
const CODE_INK = "DCE8E1";

function pngDimensions(buffer) {
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

/** marked inline tokens -> docx TextRun[] (bold / code / metin) */
function inlineToRuns(tokens, baseOpts = {}) {
  const runs = [];
  for (const t of tokens || []) {
    switch (t.type) {
      case "strong":
        runs.push(...inlineToRuns(t.tokens, { ...baseOpts, bold: true }));
        break;
      case "em":
        runs.push(...inlineToRuns(t.tokens, { ...baseOpts, italics: true }));
        break;
      case "codespan":
        runs.push(
          new TextRun({
            text: t.text,
            font: "Consolas",
            size: 19,
            color: ACCENT,
            ...baseOpts,
          })
        );
        break;
      case "link":
        runs.push(...inlineToRuns(t.tokens, { ...baseOpts, color: ACCENT, underline: {} }));
        break;
      case "br":
        runs.push(new TextRun({ text: "", break: 1, ...baseOpts }));
        break;
      default:
        runs.push(new TextRun({ text: t.text ?? "", ...baseOpts }));
    }
  }
  return runs;
}

function calloutParagraphs(tokens) {
  const paras = [];
  for (const tk of tokens) {
    if (tk.type === "paragraph" || tk.type === "text") {
      paras.push(
        new Paragraph({
          indent: { left: 340 },
          border: { left: { style: BorderStyle.SINGLE, size: 18, color: ACCENT_2, space: 10 } },
          shading: { type: ShadingType.CLEAR, fill: SURFACE_2 },
          spacing: { before: 160, after: 160 },
          children: inlineToRuns(tk.tokens, { italics: true, color: INK_SOFT, size: 20 }),
        })
      );
    }
  }
  return paras;
}

function codeBlockParagraphs(text) {
  return text.split("\n").map(
    (line) =>
      new Paragraph({
        shading: { type: ShadingType.CLEAR, fill: CODE_BG },
        spacing: { before: 0, after: 0, line: 260 },
        children: [
          new TextRun({
            text: line.length ? line : " ",
            font: "Consolas",
            size: 16,
            color: CODE_INK,
          }),
        ],
      })
  );
}

function tableFromToken(token) {
  const colCount = token.header.length;
  const widthPct = Math.floor(9000 / colCount);

  const headerRow = new TableRow({
    tableHeader: true,
    children: token.header.map(
      (cell) =>
        new TableCell({
          width: { size: widthPct, type: WidthType.PCT },
          shading: { type: ShadingType.CLEAR, fill: SURFACE_2 },
          verticalAlign: VerticalAlign.CENTER,
          margins: { top: 80, bottom: 80, left: 100, right: 100 },
          children: [
            new Paragraph({
              children: inlineToRuns(cell.tokens, { bold: true, size: 16, color: INK_FAINT }),
            }),
          ],
        })
    ),
  });

  const bodyRows = token.rows.map(
    (row) =>
      new TableRow({
        children: row.map(
          (cell) =>
            new TableCell({
              width: { size: widthPct, type: WidthType.PCT },
              margins: { top: 70, bottom: 70, left: 100, right: 100 },
              children: [
                new Paragraph({
                  children: inlineToRuns(cell.tokens, { size: 18 }),
                }),
              ],
            })
        ),
      })
  );

  return new Table({
    width: { size: 100, type: WidthType.PCT },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: LINE },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: LINE },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: LINE },
      insideVertical: { style: BorderStyle.NONE },
    },
    rows: [headerRow, ...bodyRows],
  });
}

async function diagramParagraph(n) {
  const pngPath = diagramPngPath(n);
  const buffer = await readFile(pngPath);
  const { width, height } = pngDimensions(buffer);
  const targetWidth = 520;
  const targetHeight = Math.round((height / width) * targetWidth);

  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 160, after: 160 },
    border: {
      top: { style: BorderStyle.SINGLE, size: 4, color: LINE },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: LINE },
      left: { style: BorderStyle.SINGLE, size: 4, color: LINE },
      right: { style: BorderStyle.SINGLE, size: 4, color: LINE },
    },
    children: [
      new ImageRun({
        data: buffer,
        transformation: { width: targetWidth, height: targetHeight },
        type: "png",
      }),
    ],
  });
}

async function tokensToDocxChildren(tokens) {
  const children = [];
  let firstH1 = true;
  let firstH2 = true;

  for (const token of tokens) {
    switch (token.type) {
      case "heading": {
        if (token.depth === 1) {
          children.push(
            new Paragraph({
              heading: HeadingLevel.TITLE,
              pageBreakBefore: !firstH1,
              spacing: { after: 160 },
              children: inlineToRuns(token.tokens, { color: INK }),
            })
          );
          firstH1 = false;
        } else if (token.depth === 2) {
          children.push(
            new Paragraph({
              heading: HeadingLevel.HEADING_1,
              pageBreakBefore: !firstH2,
              spacing: { before: 200, after: 160 },
              border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: ACCENT, space: 6 } },
              children: inlineToRuns(token.tokens, { color: INK }),
            })
          );
          firstH2 = false;
        } else {
          children.push(
            new Paragraph({
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 220, after: 100 },
              children: inlineToRuns(token.tokens, { color: INK }),
            })
          );
        }
        break;
      }
      case "paragraph": {
        const raw = token.text?.trim();
        const diagramMatch = raw && raw.match(/^@@DIAGRAM_PLACEHOLDER_(\d+)@@$/);
        if (diagramMatch) {
          children.push(await diagramParagraph(Number(diagramMatch[1])));
        } else {
          children.push(
            new Paragraph({
              spacing: { after: 120 },
              children: inlineToRuns(token.tokens, { size: 21, color: INK }),
            })
          );
        }
        break;
      }
      case "list": {
        token.items.forEach((item, idx) => {
          const runs = inlineToRuns(item.tokens?.[0]?.tokens || item.tokens, { size: 21 });
          children.push(
            new Paragraph({
              spacing: { after: 60 },
              ...(token.ordered
                ? {}
                : { bullet: { level: 0 } }),
              children: token.ordered
                ? [new TextRun({ text: `${idx + 1}. `, bold: true, color: ACCENT }), ...runs]
                : runs,
            })
          );
        });
        break;
      }
      case "table":
        children.push(tableFromToken(token));
        children.push(new Paragraph({ text: "", spacing: { after: 120 } }));
        break;
      case "code":
        children.push(...codeBlockParagraphs(token.text));
        children.push(new Paragraph({ text: "", spacing: { after: 160 } }));
        break;
      case "blockquote":
        children.push(...calloutParagraphs(token.tokens));
        break;
      case "hr":
        children.push(
          new Paragraph({
            border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: LINE } },
            spacing: { before: 80, after: 80 },
          })
        );
        break;
      default:
        break;
    }
  }
  return children;
}

function coverParagraphs(meta) {
  const generatedOn = new Date().toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return [
    new Paragraph({
      spacing: { before: 2400, after: 200 },
      children: [
        new TextRun({
          text: "SİSTEM MİMARİSİ & YOL HARİTASI DOKÜMANI",
          font: "Consolas",
          size: 18,
          color: ACCENT_2,
          bold: true,
        }),
      ],
    }),
    new Paragraph({
      spacing: { after: 200 },
      children: [
        new TextRun({
          text: meta.title || "HarmonyBlend (HB)",
          bold: true,
          size: 52,
          color: INK,
        }),
      ],
    }),
    new Paragraph({
      spacing: { after: 1600 },
      children: [new TextRun({ text: meta.subtitle || "", size: 26, color: INK_SOFT })],
    }),
    new Paragraph({
      border: { top: { style: BorderStyle.SINGLE, size: 4, color: LINE, space: 10 } },
      children: [
        new TextRun({
          text: `Oluşturulma tarihi: ${generatedOn}`,
          font: "Consolas",
          size: 17,
          color: INK_FAINT,
        }),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "docs/roadmap.md kaynağından otomatik üretildi",
          font: "Consolas",
          size: 17,
          color: INK_FAINT,
        }),
      ],
    }),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

export async function generateDocx() {
  const { meta, content } = await loadRoadmap();
  const { content: withTokens } = replaceMermaidBlocks(content);
  const tokens = marked.lexer(withTokens);

  const body = await tokensToDocxChildren(tokens);

  const doc = new Document({
    styles: {
      default: {
        document: { run: { font: "Segoe UI", size: 21, color: INK } },
      },
      paragraphStyles: [
        {
          id: "Title",
          name: "Title",
          basedOn: "Normal",
          next: "Normal",
          run: { font: "Georgia", size: 52, color: INK },
        },
        {
          id: "Heading1",
          name: "Heading 1",
          basedOn: "Normal",
          next: "Normal",
          run: { font: "Georgia", size: 32, color: INK },
        },
        {
          id: "Heading2",
          name: "Heading 2",
          basedOn: "Normal",
          next: "Normal",
          run: { font: "Georgia", size: 25, color: INK },
        },
      ],
    },
    sections: [
      {
        properties: { page: { margin: { top: 1000, bottom: 1000, left: 1100, right: 1100 } } },
        children: [...coverParagraphs(meta), ...body],
      },
    ],
  });

  await mkdir(OUTPUT_DIR, { recursive: true });
  const outPath = path.join(OUTPUT_DIR, "roadmap.docx");
  const buffer = await Packer.toBuffer(doc);
  await writeFile(outPath, buffer);
  return outPath;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  generateDocx()
    .then((p) => console.log(`Word belgesi üretildi: ${p}`))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
