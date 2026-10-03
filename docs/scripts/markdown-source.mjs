import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const DOCS_ROOT = path.resolve(__dirname, "..");
export const DIAGRAMS_DIR = path.join(DOCS_ROOT, "assets", "diagrams");
export const OUTPUT_DIR = path.join(DOCS_ROOT, "output");

export function sourceMdPath(name) {
  return path.join(DOCS_ROOT, `${name}.md`);
}

export function outputPath(name, ext) {
  return path.join(OUTPUT_DIR, `${name}.${ext}`);
}

/** Basit frontmatter ayrıştırıcı: yalnızca "key: value" satırlarını okur. */
export function splitFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, content: raw };
  const meta = {};
  for (const line of match[1].split("\n")) {
    const m = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (m) meta[m[1]] = m[2].trim();
  }
  return { meta, content: match[2] };
}

export async function loadMarkdownDoc(name) {
  const raw = await readFile(sourceMdPath(name), "utf-8");
  return splitFrontmatter(raw);
}

const MERMAID_TOKEN = (n) => `@@DIAGRAM_PLACEHOLDER_${n}@@`;

/**
 * ```mermaid``` bloklarını sırayla bir token ile değiştirir.
 * Böylece markdown -> HTML/DOCX dönüşümünde diyagramlar ayrı ele alınabilir.
 */
export function replaceMermaidBlocks(content) {
  let index = 0;
  const content2 = content.replace(/```mermaid\n[\s\S]*?```/g, () => {
    index += 1;
    return MERMAID_TOKEN(index);
  });
  return { content: content2, diagramCount: index };
}

export function diagramToken(n) {
  return MERMAID_TOKEN(n);
}

export function diagramPngPath(n) {
  return path.join(DIAGRAMS_DIR, `diagram-${n}.png`);
}

/** Markdown içindeki yerel (http olmayan) görsel yollarını docs/ köküne göre çözer. */
export function resolveLocalImagePath(src) {
  return path.join(DOCS_ROOT, src);
}

/** HTML içindeki yerel <img src="..."> referanslarını base64 data URI'ye çevirir
 * (puppeteer'ın page.setContent'inde taban URL olmadığından dosya yolları çözülemiyor). */
export async function inlineLocalImages(html) {
  const imgTag = /<img src="([^"]+)"([^>]*)>/g;
  const matches = [...html.matchAll(imgTag)];
  let result = html;
  for (const match of matches) {
    const [full, src, rest] = match;
    if (src.startsWith("http") || src.startsWith("data:")) continue;
    const buffer = await readFile(resolveLocalImagePath(src));
    const dataUri = `data:image/png;base64,${buffer.toString("base64")}`;
    result = result.replaceAll(full, `<img src="${dataUri}"${rest}>`);
  }
  return result;
}
