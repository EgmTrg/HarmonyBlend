import { renderDiagrams } from "./render-diagrams.mjs";
import { generatePdf } from "./generate-pdf.mjs";
import { generateDocx } from "./generate-docx.mjs";

async function main() {
  console.log("1/3 · diyagramlar render ediliyor...");
  await renderDiagrams();

  console.log("2/3 · PDF üretiliyor...");
  const pdfPath = await generatePdf();
  console.log(`  -> ${pdfPath}`);

  console.log("3/3 · Word belgesi üretiliyor...");
  const docxPath = await generateDocx();
  console.log(`  -> ${docxPath}`);

  console.log("\nTamamlandı. docs/roadmap.md içeriğini güncelleyip 'npm run build' ile yeniden üretebilirsiniz.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
