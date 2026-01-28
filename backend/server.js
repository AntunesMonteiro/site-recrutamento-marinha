// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

// Ollama config
const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3.2:3b";
const EMBED_MODEL = process.env.OLLAMA_EMBED_MODEL || "nomic-embed-text";

// Vector store
const VECTOR_STORE_PATH = path.resolve("vector_store_emfar.json");
let VECTOR_STORE = [];

function loadVectorStore() {
  if (!fs.existsSync(VECTOR_STORE_PATH)) {
    console.warn("⚠️ vector_store_emfar.json não encontrado. Corre: node ingest-emfar.js");
    VECTOR_STORE = [];
    return;
  }
  try {
    VECTOR_STORE = JSON.parse(fs.readFileSync(VECTOR_STORE_PATH, "utf-8"));
    console.log(`📚 EMFAR carregado (${VECTOR_STORE.length} excertos)`);
  } catch (e) {
    console.warn("⚠️ Falha ao ler vector_store_emfar.json:", e);
    VECTOR_STORE = [];
  }
}
loadVectorStore();

// ---------- math ----------
function cosineSimilarity(a, b) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

async function embedQuery(text) {
  const r = await fetch(`${OLLAMA_URL}/api/embeddings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: EMBED_MODEL, prompt: text }),
  });

  if (!r.ok) {
    const t = await r.text().catch(() => "");
    throw new Error(`Embeddings falhou: HTTP ${r.status} ${t}`.slice(0, 800));
  }

  const data = await r.json();
  if (!data?.embedding) throw new Error("Embedding vazio do Ollama.");
  return data.embedding;
}

async function retrieveContext(query, topK = 6) {
  if (!VECTOR_STORE.length) return { context: "", hits: [] };

  const qEmb = await embedQuery(query);

  const scored = VECTOR_STORE.map((item) => ({
    ...item,
    score: cosineSimilarity(qEmb, item.embedding),
  }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  const context = scored
    .map((h, idx) => `### EXCERTO ${idx + 1} (EMFAR pág. ${h.page ?? "?"})\n${h.text}`)
    .join("\n\n");

  const hits = scored.map((h) => ({
    source: h.source,
    chunk: h.chunk,
    page: h.page ?? null,
    score: Number(h.score.toFixed(4)),
  }));

  return { context, hits };
}

// ---------- routes ----------
app.get("/health", async (_req, res) => {
  try {
    const r = await fetch(`${OLLAMA_URL}/api/tags`);
    res.json({
      ok: true,
      ollama: r.ok,
      chat_model: OLLAMA_MODEL,
      embed_model: EMBED_MODEL,
      emfar_chunks: VECTOR_STORE.length,
    });
  } catch (e) {
    res.json({ ok: true, ollama: false, error: String(e) });
  }
});

app.post("/api/reload-emfar", (_req, res) => {
  loadVectorStore();
  res.json({ ok: true, emfar_chunks: VECTOR_STORE.length });
});

// ✅ Chat com modo EMFAR (RAG) + fallback geral
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body || {};
    if (!message) return res.status(400).json({ error: "message em falta" });

    // 1) RAG
    const { context, hits } = await retrieveContext(message, 6);
    const topScore = hits?.[0]?.score ?? 0;

    // Ajusta este valor conforme testes
    const MIN_SCORE = 0.78;

    // 2) Se for suficientemente relevante => responder com EMFAR
    if (context && topScore >= MIN_SCORE) {
      const systemEMFAR =
  "És um assistente de apoio ao recrutamento da Marinha Portuguesa.\n" +
  "Responde em PT-PT, de forma clara e objetiva.\n" +
  "REGRAS:\n" +
  "1) Usa APENAS o CONTEXTO (EMFAR) fornecido.\n" +
  "2) NÃO digas \"Não consta no EMFAR\" neste modo, porque já existe contexto relevante.\n" +
  "3) Se o utilizador pedir algo que não esteja nos excertos, diz apenas: \"Não encontrei essa parte nos excertos do EMFAR fornecidos.\".\n" +
  "4) No fim, cita sempre: \"Fonte: EMFAR, pág. X\" usando a(s) página(s) indicadas nos títulos dos excertos.\n" +
  "5) Não menciones fontes externas.\n";


      const userContent =
        `CONTEXTO (EMFAR):\n${context}\n\nPERGUNTA:\n${message}`;

      const payload = {
        model: OLLAMA_MODEL,
        stream: false,
        messages: [
          { role: "system", content: systemEMFAR },
          { role: "user", content: userContent },
        ],
      };

      const r = await fetch(`${OLLAMA_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!r.ok) {
        const text = await r.text().catch(() => "");
        return res.status(500).json({
          error: "Erro a chamar o Ollama (EMFAR)",
          details: `HTTP ${r.status} ${r.statusText} ${text}`.slice(0, 2000),
        });
      }

      const data = await r.json();
      const answer = data?.message?.content?.trim() || "Sem resposta.";

      return res.json({
        answer,
        mode: "emfar",
        score: topScore,
        sources: hits,
      });
    }

    // 3) Caso contrário => fallback geral (como antes)
    const systemGeneral =
      "És um assistente de recrutamento da Marinha Portuguesa.\n" +
      "Responde em PT-PT, de forma clara e útil.\n" +
      "Usa conhecimento geral e público.\n" +
      "Evita inventar números, idades, prazos ou regras específicas.\n" +
      "Se não tiveres certeza, diz isso e sugere confirmar nos avisos/regulamentos oficiais.";

    const payload2 = {
      model: OLLAMA_MODEL,
      stream: false,
      messages: [
        { role: "system", content: systemGeneral },
        { role: "user", content: message },
      ],
    };

    const r2 = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload2),
    });

    if (!r2.ok) {
      const text = await r2.text().catch(() => "");
      return res.status(500).json({
        error: "Erro a chamar o Ollama (fallback)",
        details: `HTTP ${r2.status} ${r2.statusText} ${text}`.slice(0, 2000),
      });
    }

    const data2 = await r2.json();
    const answer2 = data2?.message?.content?.trim() || "Sem resposta.";

    return res.json({
      answer: answer2,
      mode: "general",
      score: topScore,
      sources: hits, // devolve para debug (mesmo que fraco)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no backend", details: String(err) });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend a correr em http://localhost:${PORT}`);
  console.log(`🤖 Ollama: ${OLLAMA_URL} | chat model: ${OLLAMA_MODEL} | embed model: ${EMBED_MODEL}`);
});
