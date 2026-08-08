import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const DOCS_ROOT = path.resolve(__dirname, "..");
export const ROADMAP_MD = path.join(DOCS_ROOT, "roadmap.md");
export const DIAGRAMS_DIR = path.join(DOCS_ROOT, "assets", "diagrams");
export const OUTPUT_DIR = path.join(DOCS_ROOT, "output");

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

export async function loadRoadmap() {
  const raw = await readFile(ROADMAP_MD, "utf-8");
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
