import { renderDiagrams } from "./render-diagrams.mjs";
import { generatePdf } from "./generate-pdf.mjs";
import { generateDocx } from "./generate-docx.mjs";

async function main() {
  const name = process.argv[2] || "roadmap";

  console.log(`1/3 · diyagramlar render ediliyor... (${name}.md)`);
  await renderDiagrams(name);

  console.log("2/3 · PDF üretiliyor...");
  const pdfPath = await generatePdf(name);
  console.log(`  -> ${pdfPath}`);

  console.log("3/3 · Word belgesi üretiliyor...");
  const docxPath = await generateDocx(name);
  console.log(`  -> ${docxPath}`);

  console.log(`\nTamamlandı. docs/${name}.md içeriğini güncelleyip 'npm run build -- ${name}' ile yeniden üretebilirsiniz.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
