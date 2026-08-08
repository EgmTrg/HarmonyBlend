import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";
import puppeteer from "puppeteer-core";
import { findChromeExecutable } from "./find-chrome.mjs";
import {
  loadRoadmap,
  replaceMermaidBlocks,
  diagramToken,
  diagramPngPath,
  OUTPUT_DIR,
} from "./markdown-source.mjs";

export async function buildBodyHtml() {
  const { meta, content } = await loadRoadmap();
  const { content: withTokens, diagramCount } = replaceMermaidBlocks(content);

  let bodyHtml = marked.parse(withTokens);

  for (let i = 1; i <= diagramCount; i++) {
    const pngPath = diagramPngPath(i);
    const pngBuffer = await readFile(pngPath);
    const dataUri = `data:image/png;base64,${pngBuffer.toString("base64")}`;
    const figure = `<figure class="diagram"><img src="${dataUri}" alt="Diyagram ${i}" /></figure>`;
    const tokenPattern = new RegExp(`<p>\\s*${diagramToken(i)}\\s*</p>`);
    bodyHtml = bodyHtml.replace(tokenPattern, figure);
  }

  return { meta, bodyHtml };
}

export function pageHtml(meta, bodyHtml) {
  const generatedOn = new Date().toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8" />
<title>${meta.title || "Roadmap"}</title>
<style>
  :root {
    --ink: #1a2420;
    --ink-soft: #4b5750;
    --ink-faint: #7c877f;
    --accent: #1f5f56;
    --accent-2: #a85a26;
    --line: #d3d9d2;
    --surface-2: #eef1ef;
    --code-bg: #182420;
    --code-ink: #dce8e1;
    --serif: Georgia, "Iowan Old Style", "Palatino Linotype", serif;
    --sans: "Segoe UI", -apple-system, Arial, sans-serif;
    --mono: "Consolas", "SFMono-Regular", Menlo, monospace;
  }
  * { box-sizing: border-box; }
  html, body { background: #ffffff; }
  body {
    font-family: var(--sans);
    color: var(--ink);
    font-size: 10.6pt;
    line-height: 1.55;
    margin: 0;
  }
  .cover {
    min-height: 245mm;
    display: flex;
    flex-direction: column;
    justify-content: center;
    page-break-after: always;
  }
  .cover .eyebrow {
    font-family: var(--mono);
    font-size: 11pt;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent-2);
    margin: 0 0 18px;
  }
  .cover h1 {
    font-family: var(--serif);
    font-weight: 400;
    font-size: 34pt;
    line-height: 1.15;
    margin: 0 0 16px;
    color: var(--ink);
  }
  .cover .subtitle {
    font-size: 14pt;
    color: var(--ink-soft);
    max-width: 34em;
    margin: 0 0 40px;
  }
  .cover .meta {
    font-family: var(--mono);
    font-size: 9.5pt;
    color: var(--ink-faint);
    border-top: 1px solid var(--line);
    padding-top: 14px;
    max-width: 34em;
  }

  h1, h2, h3 { font-family: var(--serif); font-weight: 400; color: var(--ink); text-wrap: balance; }
  body > h1 { font-size: 22pt; margin: 0 0 12px; break-after: avoid; }
  h2 {
    font-size: 18pt;
    margin: 30px 0 14px;
    padding-bottom: 8px;
    border-bottom: 2px solid var(--accent);
    break-before: page;
    break-after: avoid;
  }
  h2:first-of-type { break-before: avoid; }
  h3 { font-size: 13pt; margin: 20px 0 8px; break-after: avoid; }
  p { margin: 8px 0; }
  strong { color: var(--ink); }
  ul, ol { margin: 8px 0; padding-left: 20px; }
  li { margin: 3px 0; }
  li p { margin: 0; }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 9.2pt;
    margin: 14px 0;
    break-inside: avoid;
  }
  th, td {
    text-align: left;
    padding: 6px 9px;
    border-bottom: 1px solid var(--line);
    vertical-align: top;
  }
  th {
    font-family: var(--mono);
    font-size: 8pt;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--ink-faint);
    border-bottom: 1.5px solid var(--ink-faint);
  }

  code {
    font-family: var(--mono);
    background: var(--surface-2);
    padding: 1px 4px;
    border-radius: 2px;
    font-size: 9pt;
  }
  pre {
    background: var(--code-bg);
    color: var(--code-ink);
    padding: 12px 14px;
    border-radius: 3px;
    overflow-x: auto;
    font-family: var(--mono);
    font-size: 8.3pt;
    line-height: 1.5;
    margin: 12px 0;
    break-inside: avoid;
    white-space: pre-wrap;
  }
  pre code { background: none; padding: 0; color: inherit; }

  blockquote {
    border-left: 3px solid var(--accent-2);
    background: var(--surface-2);
    margin: 14px 0;
    padding: 8px 16px;
    font-size: 9.6pt;
    color: var(--ink-soft);
    break-inside: avoid;
  }
  blockquote p { margin: 4px 0; }

  hr { border: none; border-top: 1px solid var(--line); margin: 24px 0; }

  figure.diagram {
    margin: 16px 0;
    padding: 10px;
    border: 1px solid var(--line);
    border-radius: 3px;
    text-align: center;
    break-inside: avoid;
  }
  figure.diagram img { max-width: 100%; }
</style>
</head>
<body>
  <section class="cover">
    <p class="eyebrow">Sistem Mimarisi &amp; Yol Haritası Dokümanı</p>
    <h1>${meta.title || "B2B Sipariş &amp; Bayi Yönetim Sistemi"}</h1>
    <p class="subtitle">${meta.subtitle || ""}</p>
    <p class="meta">Oluşturulma tarihi: ${generatedOn}<br/>docs/roadmap.md kaynağından otomatik üretildi</p>
  </section>
  ${bodyHtml}
</body>
</html>`;
}

export async function generatePdf() {
  const { meta, bodyHtml } = await buildBodyHtml();
  const html = pageHtml(meta, bodyHtml);

  await mkdir(OUTPUT_DIR, { recursive: true });
  const outPath = path.join(OUTPUT_DIR, "roadmap.pdf");

  const browser = await puppeteer.launch({
    executablePath: findChromeExecutable(),
    headless: true,
  });
  try {
    const page = await browser.newPage();
    await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "light" }]);
    await page.setContent(html, { waitUntil: "networkidle0" });
    await page.pdf({
      path: outPath,
      format: "A4",
      printBackground: true,
      margin: { top: "20mm", bottom: "18mm", left: "18mm", right: "18mm" },
      displayHeaderFooter: true,
      headerTemplate: `<div></div>`,
      footerTemplate: `<div style="font-size:7.5pt;color:#9aa7ae;width:100%;text-align:center;font-family:Consolas,monospace;">
        B2B Sipariş &amp; Bayi Yönetim Sistemi — <span class="pageNumber"></span> / <span class="totalPages"></span>
      </div>`,
    });
  } finally {
    await browser.close();
  }

  return outPath;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  generatePdf()
    .then((p) => console.log(`PDF üretildi: ${p}`))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
