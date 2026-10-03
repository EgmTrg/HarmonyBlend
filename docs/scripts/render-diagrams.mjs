import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";
import { findChromeExecutable } from "./find-chrome.mjs";
import { DOCS_ROOT, DIAGRAMS_DIR, sourceMdPath } from "./markdown-source.mjs";

const MERMAID_CANDIDATES = [
  "mermaid.min.js",
  "mermaid.js",
].map((f) => path.join(DOCS_ROOT, "node_modules", "mermaid", "dist", f));

function resolveMermaidBundle() {
  const found = MERMAID_CANDIDATES.find((p) => existsSync(p));
  if (!found) {
    throw new Error(
      "mermaid paketi bulunamadı. Önce 'npm install' çalıştırın (docs/ klasöründe)."
    );
  }
  return found;
}

/** roadmap.md içindeki ```mermaid ... ``` bloklarını sırayla çıkarır. */
export function extractMermaidBlocks(markdown) {
  const re = /```mermaid\n([\s\S]*?)```/g;
  const blocks = [];
  let match;
  while ((match = re.exec(markdown)) !== null) {
    blocks.push(match[1].trim());
  }
  return blocks;
}

const THEME_VARIABLES = {
  background: "#ffffff",
  primaryColor: "#eaf3f0",
  primaryTextColor: "#1a2420",
  primaryBorderColor: "#1f5f56",
  lineColor: "#5c6b63",
  secondaryColor: "#f4ece3",
  tertiaryColor: "#ffffff",
  fontFamily: "Segoe UI, -apple-system, sans-serif",
  fontSize: "15px",
};

async function renderOne(page, code, outFile) {
  const html = `<!doctype html><html><head><meta charset="utf-8"></head>
  <body style="margin:0;background:#ffffff;">
    <div id="target"></div>
  </body></html>`;
  await page.setContent(html, { waitUntil: "load" });

  const svg = await page.evaluate(
    async (diagramCode, themeVariables) => {
      mermaid.initialize({
        startOnLoad: false,
        theme: "base",
        themeVariables,
        securityLevel: "strict",
      });
      const { svg } = await mermaid.render("diagram-svg", diagramCode);
      return svg;
    },
    code,
    THEME_VARIABLES
  );

  await page.setContent(
    `<!doctype html><html><head><meta charset="utf-8"><style>
      body { margin: 0; background: #ffffff; display: inline-block; padding: 24px; }
    </style></head><body>${svg}</body></html>`,
    { waitUntil: "load" }
  );

  const element = await page.$("svg");
  await element.screenshot({ path: outFile, omitBackground: false });
}

export async function renderDiagrams(name = "roadmap") {
  const markdown = await readFile(sourceMdPath(name), "utf-8");
  const blocks = extractMermaidBlocks(markdown);

  await mkdir(DIAGRAMS_DIR, { recursive: true });

  const mermaidBundle = resolveMermaidBundle();
  const browser = await puppeteer.launch({
    executablePath: findChromeExecutable(),
    headless: true,
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 1000, deviceScaleFactor: 2.5 });
    await page.addScriptTag({ path: mermaidBundle });

    const files = [];
    for (let i = 0; i < blocks.length; i++) {
      const outFile = path.join(DIAGRAMS_DIR, `diagram-${i + 1}.png`);
      await renderOne(page, blocks[i], outFile);
      files.push(outFile);
      console.log(`  diyagram ${i + 1}/${blocks.length} render edildi -> ${path.relative(DOCS_ROOT, outFile)}`);
    }

    await writeFile(
      path.join(DIAGRAMS_DIR, "manifest.json"),
      JSON.stringify({ count: files.length, generatedAt: new Date().toISOString() }, null, 2)
    );

    return files;
  } finally {
    await browser.close();
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  renderDiagrams(process.argv[2])
    .then((files) => console.log(`Tamamlandı: ${files.length} diyagram üretildi.`))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
