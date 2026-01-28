// backend/ingest-emfar.js
import fs from "fs";
import path from "path";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

const OLLAMA_URL = "http://localhost:11434";
const EMBED_MODEL = "nomic-embed-text";

const DOCS_DIR = path.resolve("docs/emfar");
const OUTPUT_FILE = path.resolve("vector_store_emfar.json");

// Chunking por página (bom para citações)
function chunkText(text, size = 900, overlap = 180) {
  const chunks = [];
  let i = 0;
  while (i < text.length) {
    const chunk = text.slice(i, i + size).trim();
    if (chunk) chunks.push(chunk);
    i += size - overlap;
  }
  return chunks;
}

async function embed(text) {
  const r = await fetch(`${OLLAMA_URL}/api/embeddings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: EMBED_MODEL, prompt: text }),
  });

  if (!r.ok) {
    const t = await r.text().catch(() => "");
    throw new Error("Erro ao gerar embedding: " + t);
  }

  const data = await r.json();
  if (!data?.embedding) throw new Error("Embedding vazio do Ollama.");
  return data.embedding;
}

async function extractPages(filePath) {
  const buffer = fs.readFileSync(filePath);
  const uint8 = new Uint8Array(buffer);

  const loadingTask = pdfjsLib.getDocument({ data: uint8 });
  const pdf = await loadingTask.promise;

  const pages = [];
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();

    const pageText = content.items
      .map((it) => (it?.str ? it.str : ""))
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    pages.push({ page: pageNum, text: pageText });

    if (pageNum % 10 === 0) {
      console.log(`     · páginas ${pageNum}/${pdf.numPages}`);
    }
  }

  return pages;
}

(async () => {
  console.log("📘 A iniciar ingestão do EMFAR…");

  const files = fs.readdirSync(DOCS_DIR).filter((f) => f.toLowerCase().endsWith(".pdf"));
  if (!files.length) {
    console.error("❌ Nenhum PDF encontrado em docs/emfar");
    process.exit(1);
  }

  const store = [];

  for (const file of files) {
    const filePath = path.join(DOCS_DIR, file);
    console.log(`➡️ A extrair texto de ${file} (por página)`);

    const pages = await extractPages(filePath);

    const pageChunks = [];
    for (const p of pages) {
      const t = (p.text || "").replace(/–/g, "-").trim();
      if (!t) continue;

      const chunks = chunkText(t);
      for (const c of chunks) {
        pageChunks.push({ page: p.page, text: c });
      }
    }

    console.log(`   ↳ ${pageChunks.length} excertos`);

    for (let i = 0; i < pageChunks.length; i++) {
      const { page, text } = pageChunks[i];
      const embedding = await embed(text);

      store.push({
        source: file,
        chunk: i,
        page,
        text,
        embedding,
      });

      if (i % 10 === 0) {
        console.log(`     · excertos ${i}/${pageChunks.length}`);
      }
    }
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(store, null, 2));
  console.log(`✅ Vector store criado: ${OUTPUT_FILE}`);
})();
