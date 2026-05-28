import React, { useState, useEffect } from "react";

// groq aqui
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
// ─────────────────────────────────────────────

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

if (typeof document !== "undefined" && !document.getElementById("ai-spinner-style")) {
  const style = document.createElement("style");
  style.id = "ai-spinner-style";
  style.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
  document.head.appendChild(style);
}

export default function AIAnalysisModal({ onClose, patientName, emotion, period, labels, data, cor }) {
  const [status,   setStatus]   = useState("loading");
  const [response, setResponse] = useState("");
  const isMobile = window.screen.width < 768;

  const buildPrompt = () => {
    const min    = Math.min(...data);
    const max    = Math.max(...data);
    const avg    = (data.reduce((a, b) => a + b, 0) / data.length).toFixed(1);
    const trend  = data[data.length - 1] > data[0] ? "crescente" : data[data.length - 1] < data[0] ? "decrescente" : "estável";
    const maxIdx = data.indexOf(max);
    const minIdx = data.indexOf(min);

    return `Você é um assistente clínico auxiliar. Analise os dados emocionais abaixo de forma clara e profissional para o psicólogo responsável.

Paciente: ${patientName}
Emoção: ${emotion}
Período: de ${labels[0]} até ${labels[labels.length - 1]}
Mínimo: ${min}/10 (dia ${labels[minIdx]})
Máximo: ${max}/10 (dia ${labels[maxIdx]})
Média: ${avg}/10
Tendência: ${trend}
Valores registrados: ${data.join(", ")}

Escreva uma análise clínica curta (3 a 4 parágrafos) cobrindo:
1. Resumo geral da variação no período
2. Momentos de destaque (pico e vale) e possível significado clínico
3. Tendência atual e o que pode indicar
4. Sugestão de atenção para o psicólogo

Use linguagem profissional mas acessível. Escreva em texto corrido, sem bullet points.Vale lembrar também que caso a data de inicio seja maior que a de fim, provavelmentr se passou um ano daquela primeira consulta Responda em português.`;
  };

  const analyze = async () => {
    setStatus("loading");
    setResponse("");
    try {
      const res = await fetch(GROQ_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: buildPrompt() }],
          max_tokens: 800,
          temperature: 0.7,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error?.message || "Erro na API");
      setResponse(json.choices?.[0]?.message?.content || "");
      setStatus("done");
    } catch (err) {
      setResponse("Não foi possível conectar à IA. Verifique sua chave e tente novamente.");
      setStatus("error");
    }
  };

  useEffect(() => { analyze(); }, []);

  // mesma coisa aqui | mobile usa px fixos
  const fs = isMobile ? {
    overlay:     { position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" },
    modal:       { background: "#0f0f1a", border: "1px solid #1a1a2e", borderRadius: "20px", width: "100%", maxWidth: "480px", maxHeight: "80vh", overflowY: "auto", padding: "20px 18px", fontFamily: "'Lexend Deca', sans-serif", position: "relative" },
    closeBtn:    { position: "absolute", top: "14px", right: "14px", background: "transparent", border: "none", color: "#555577", fontSize: "16px", cursor: "pointer" },
    title:       { fontSize: "14px", fontWeight: "700", color: "#c0c8e8", margin: 0 },
    subtitle:    { fontSize: "11px", color: "#555577", margin: "3px 0 0" },
    divider:     { border: "none", borderTop: "1px solid #1a1a2e", margin: "14px 0" },
    spinner:     { width: "28px", height: "28px", border: "3px solid #1a1a2e", borderTopColor: cor || "#4d8bff", borderRadius: "50%", animation: "spin 0.8s linear infinite" },
    loadingText: { color: "#555577", fontSize: "12px" },
    responseText:{ color: "#c0c8e8", fontSize: "13px", lineHeight: "1.8", whiteSpace: "pre-wrap" },
    errorText:   { color: "#ff4d4d", fontSize: "12px", lineHeight: "1.6" },
    retryBtn:    { marginTop: "12px", padding: "7px 16px", borderRadius: "999px", border: "1.5px solid #4d8bff", background: "rgba(77,139,255,0.1)", color: "#4d8bff", fontSize: "11px", fontWeight: "600", cursor: "pointer", fontFamily: "'Lexend Deca', sans-serif" },
  } : {
    // dei uma arrumadinha pra ficar bom no zoom de 25%
    overlay:     { position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "2vw" },
    modal:       { background: "#0f0f1a", border: "0.1vw solid #1a1a2e", borderRadius: "1.5vw", width: "40vw", maxHeight: "75vh", overflowY: "auto", padding: "2.5vw 2.5vw", fontFamily: "'Lexend Deca', sans-serif", position: "relative" },
    closeBtn:    { position: "absolute", top: "1.2vw", right: "1.2vw", background: "transparent", border: "none", color: "#555577", fontSize: "1.2vw", cursor: "pointer" },
    title:       { fontSize: "1.4vw", fontWeight: "700", color: "#c0c8e8", margin: 0 },
    subtitle:    { fontSize: "1vw", color: "#555577", margin: "0.3vw 0 0" },
    divider:     { border: "none", borderTop: "0.1vw solid #1a1a2e", margin: "1.2vw 0" },
    spinner:     { width: "2.5vw", height: "2.5vw", border: "0.25vw solid #1a1a2e", borderTopColor: cor || "#4d8bff", borderRadius: "50%", animation: "spin 0.8s linear infinite" },
    loadingText: { color: "#555577", fontSize: "1vw" },
    responseText:{ color: "#c0c8e8", fontSize: "1.1vw", lineHeight: "1.9", whiteSpace: "pre-wrap" },
    errorText:   { color: "#ff4d4d", fontSize: "1vw", lineHeight: "1.6" },
    retryBtn:    { marginTop: "1vw", padding: "0.6vw 1.4vw", borderRadius: "999px", border: `0.15vw solid #4d8bff`, background: "rgba(77,139,255,0.1)", color: "#4d8bff", fontSize: "1vw", fontWeight: "600", cursor: "pointer", fontFamily: "'Lexend Deca', sans-serif" },
  };

  return (
    <div style={fs.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={fs.modal}>
        <button style={fs.closeBtn} onClick={onClose}>✕</button>

        <div style={{ display: "flex", alignItems: "flex-start", gap: isMobile ? "8px" : "0.8vw", marginBottom: isMobile ? "14px" : "1.2vw" }}>
          <span style={{ fontSize: isMobile ? "16px" : "1.4vw", marginTop: "2px", color: cor }}>✦</span>
          <div>
            <p style={fs.title}>Análise de IA — {emotion}</p>
            <p style={fs.subtitle}>{patientName} · {labels[0]} até {labels[labels.length - 1]}</p>
          </div>
        </div>

        <hr style={fs.divider} />

        {status === "loading" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: isMobile ? "10px" : "1vw", padding: isMobile ? "24px 0" : "3vw 0" }}>
            <div style={fs.spinner} />
            <p style={fs.loadingText}>Analisando variação emocional...</p>
          </div>
        )}

        {status === "done" && (
          <p style={fs.responseText}>{response}</p>
        )}

        {status === "error" && (
          <div>
            <p style={fs.errorText}>{response}</p>
            <button style={fs.retryBtn} onClick={analyze}>Tentar novamente</button>
          </div>
        )}
      </div>
    </div>
  );
}