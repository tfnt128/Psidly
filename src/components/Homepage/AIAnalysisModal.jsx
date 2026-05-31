import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

if (typeof document !== "undefined" && !document.getElementById("ai-spinner-style")) {
  const style = document.createElement("style");
  style.id = "ai-spinner-style";
  style.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
  document.head.appendChild(style);
}

export default function AIAnalysisModal({ onClose, patientName, emotion, period, labels, data, cor }) {
  const { t } = useTranslation();
  const [status,   setStatus]   = useState("loading");
  const [response, setResponse] = useState("");
  const isMobile = window.screen.width < 768;

  const buildPrompt = () => {
    const min    = Math.min(...data);
    const max    = Math.max(...data);
    const avg    = (data.reduce((a, b) => a + b, 0) / data.length).toFixed(1);
    const maxIdx = data.indexOf(max);
    const minIdx = data.indexOf(min);

    // tendência usando chaves do i18n — consistente com o idioma atual
    const trend =
      data[data.length - 1] > data[0] ? t('tendenciaCrescente') :
      data[data.length - 1] < data[0] ? t('tendenciaDecrescente') :
      t('tendenciaEstavel');

    return `You are a clinical support assistant. Analyze the emotional data below clearly and professionally for the responsible psychologist.

Patient: ${patientName}
Emotion: ${emotion}
Period: from ${labels[0]} to ${labels[labels.length - 1]}
Minimum: ${min}/10 (day ${labels[minIdx]})
Maximum: ${max}/10 (day ${labels[maxIdx]})
Average: ${avg}/10
Trend: ${trend}
Recorded values: ${data.join(", ")}

Write a short clinical analysis (3 to 4 paragraphs) covering:
1. General summary of variation over the period
2. Notable moments (peak and valley) and possible clinical significance
3. Current trend and what it may indicate
4. Suggested points of attention for the psychologist

Use professional but accessible language. Write in continuous prose, no bullet points. Note that if the start date is later than the end date, approximately one year has passed since the first record.

${t('promptRespondaEm')}`;
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
      setResponse(err.message || "Erro desconhecido");
      setStatus("error");
    }
  };

  useEffect(() => { analyze(); }, []);

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
            <p style={fs.title}>{t('analiseIA')} — {emotion}</p>
            <p style={fs.subtitle}>{patientName} · {labels[0]} {t('ate')} {labels[labels.length - 1]}</p>
          </div>
        </div>

        <hr style={fs.divider} />

        {status === "loading" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: isMobile ? "10px" : "1vw", padding: isMobile ? "24px 0" : "3vw 0" }}>
            <div style={fs.spinner} />
            <p style={fs.loadingText}>{t('analisando')}</p>
          </div>
        )}

        {status === "done" && (
          <p style={fs.responseText}>{response}</p>
        )}

        {status === "error" && (
          <div>
            <p style={fs.errorText}>{response}</p>
            <button style={fs.retryBtn} onClick={analyze}>{t('tentarNovamente')}</button>
          </div>
        )}
      </div>
    </div>
  );
}