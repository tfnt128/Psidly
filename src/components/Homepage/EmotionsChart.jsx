import React, { useState, useMemo, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getMobileStyles } from "./EmotionsChart.styles";
import AIAnalysisModal from "./AIAnalysisModal";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

const EMOTIONS      = ["Tristeza", "Felicidade", "Ansiedade", "Raiva", "Estresse"];
const PERIODS_FULL  = ["7 Dias", "15 Dias", "1 Mês", "6 Meses", "1 Ano"];
const PERIODS_CURTO = ["7D", "15D", "1M", "6M", "1A"];

const coresPorEmocao = {
  Tristeza:   "#4d8bff",
  Felicidade: "#36e900",
  Ansiedade:  "#ff05c9",
  Raiva:      "#ff3b3b",
  Estresse:   "#e05c2a",
};

export default function EmotionsChart({ patientName }) {
  const [selectedEmotion,   setSelectedEmotion]   = useState("Tristeza");
  const [selectedPeriodIdx, setSelectedPeriodIdx] = useState(2);
  const [isMobile,          setIsMobile]          = useState(false);
  const [showAI,            setShowAI]            = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.screen.width < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const selectedPeriod = PERIODS_FULL[selectedPeriodIdx];
  const corAtual       = coresPorEmocao[selectedEmotion];
  const s              = getMobileStyles(isMobile);

  const currentLabels = useMemo(() => generateLabels(selectedPeriod, isMobile), [selectedPeriod, isMobile]);
  const currentData   = useMemo(() => generateData(selectedPeriod, isMobile),   [selectedPeriod, isMobile]);

  const chartData = useMemo(() => ({
    labels: currentLabels,
    datasets: [{
      fill: true,
      label: selectedEmotion,
      data: currentData,
      borderColor: corAtual,
      backgroundColor: (context) => {
        const { ctx, chartArea } = context.chart;
        if (!chartArea) return null;
        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradient.addColorStop(0, corAtual + "47");
        gradient.addColorStop(1, corAtual + "00");
        return gradient;
      },
      borderWidth:          isMobile ? 2 : 3,
      pointRadius:          isMobile ? 3 : 5,
      pointBackgroundColor: corAtual,
      tension: 0.1,
    }],
  }), [selectedEmotion, selectedPeriod, corAtual, isMobile, currentLabels, currentData]);

  const chartOptions = isMobile
    ? {
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: { top: 12, left: 0, right: 8, bottom: 8 } },
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            backgroundColor: "#1a1a2e",
            titleFont: { size: 12, family: "'Lexend Deca', sans-serif", weight: "bold" },
            bodyFont:  { size: 11, family: "'Lexend Deca', sans-serif" },
            padding: 8,
            cornerRadius: 8,
            borderColor: corAtual,
            borderWidth: 1,
          },
        },
        scales: {
          y: {
            min: 0, max: 10,
            grid: { color: "#1e1e38" },
            ticks: {
              color: "#7777bb",
              font: { size: 11, family: "'Lexend Deca', sans-serif", weight: "bold" },
              stepSize: 2,
              padding: 4,
              maxTicksLimit: 6,
            },
          },
          x: {
            grid: { display: false },
            ticks: {
              color: "#7777bb",
              font: { size: 10, family: "'Lexend Deca', sans-serif", weight: "bold" },
              padding: 4,
              maxTicksLimit: 5,
              maxRotation: 0,
              minRotation: 0,
            },
          },
        },
      }
    : {
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: { top: 60, left: 30, right: 40, bottom: 30 } },
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            backgroundColor: "#1a1a2e",
            titleFont: { size: 38, family: "'Lexend Deca', sans-serif", weight: "bold" },
            bodyFont:  { size: 36, family: "'Lexend Deca', sans-serif" },
            padding: 30,
            cornerRadius: 15,
            borderColor: corAtual,
            borderWidth: 2,
          },
        },
        scales: {
          y: {
            min: 0, max: 10,
            grid: { color: "#1e1e38" },
            ticks: {
              color: "#7777bb",
              font: { size: 45, family: "'Lexend Deca', sans-serif", weight: "bold" },
              stepSize: 1,
              padding: 20,
            },
          },
          x: {
            grid: { display: false },
            ticks: {
              color: "#7777bb",
              font: { size: 40, family: "'Lexend Deca', sans-serif", weight: "bold" },
              padding: 20,
            },
          },
        },
      };

  return (
    <>
      <div style={s.container}>
        <button onClick={() => window.location.href = "/Graphicspage"} style={s.backButton}>
          Voltar
        </button>

        {/* botões de emoção — scroll horizontal no mobile */}
        <div style={s.emotionTabs}>
          {EMOTIONS.map((emotion) => {
            const cor = coresPorEmocao[emotion];
            const sel = selectedEmotion === emotion;
            return (
              <button
                key={emotion}
                onClick={() => setSelectedEmotion(emotion)}
                style={{
                  ...s.emotionBtn,
                  borderColor: sel ? cor : "#d1d5db",
                  background:  sel ? cor + "1a" : "transparent",
                  color:       sel ? cor : "#9ca3af",
                }}
              >
                {emotion}
              </button>
            );
          })}
        </div>

        {/* card do gráfico — EXATAMENTE igual ao original, sem alteração */}
        <div style={s.chartCard}>
          <div style={s.cardHeader}>
            <h2 style={s.cardTitle}>{selectedEmotion} ao longo do tempo</h2>

            <div style={s.periodTabs}>
              {(isMobile ? PERIODS_CURTO : PERIODS_FULL).map((label, idx) => (
                <button
                  key={label}
                  onClick={() => setSelectedPeriodIdx(idx)}
                  style={{
                    ...s.periodBtn,
                    borderColor: selectedPeriodIdx === idx ? corAtual : "#2a2a4a",
                    background:  selectedPeriodIdx === idx ? corAtual + "22" : "transparent",
                    color:       selectedPeriodIdx === idx ? corAtual : "#555577",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div style={s.chartWrapper}>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* botao da ia fica fora do grafico, fiz isso na fé de deus e do claude */}
      <button
        onClick={() => setShowAI(true)}
        title="Analisar com IA"
        style={{
          position:     "fixed",
          bottom:       isMobile ? "100px" : "2.5vw",   // mobile: vai ficar acima do menu,tbm dei uma ajustadinha no px pra ele ficar acima da barra
          right:        isMobile ? "16px" : "2vw",
          width:        isMobile ? "48px"  : "3.5vw",
          height:       isMobile ? "48px"  : "3.5vw",
          minWidth:     isMobile ? "48px"  : "48px",
          minHeight:    isMobile ? "48px"  : "48px",
          borderRadius: "50%",
          border:       `2px solid ${corAtual}`,
          background:   `linear-gradient(135deg, ${corAtual}33, ${corAtual}11)`,
          backdropFilter: "blur(8px)",
          color:        corAtual,
          fontSize:     isMobile ? "18px" : "1.4vw",
          cursor:       "pointer",
          display:      "flex",
          alignItems:   "center",
          justifyContent: "center",
          boxShadow:    `0 0 20px ${corAtual}44`,
          transition:   "0.2s",
          zIndex:       100,
          fontFamily:   "'Lexend Deca', sans-serif",
        }}
      >
        ✦
      </button>

      {/* modal de análise */}
      {showAI && (
        <AIAnalysisModal
          onClose={() => setShowAI(false)}
          patientName={patientName}
          emotion={selectedEmotion}
          period={selectedPeriod}
          labels={currentLabels}
          data={currentData}
          cor={corAtual}
        />
      )}
    </>
  );
}

const generateData = (period, isMobile) => {
  const all    = { "7 Dias": 7, "15 Dias": 15, "1 Mês": 31, "6 Meses": 26, "1 Ano": 52 }[period] || 31;
  const points = isMobile ? Math.min(all, 8) : all;
  return Array.from({ length: points }, () => Math.floor(Math.random() * 10) + 1);
};

const generateLabels = (period, isMobile) => {
  const today  = new Date();
  const all    = { "7 Dias": 7, "15 Dias": 15, "1 Mês": 31, "6 Meses": 26, "1 Ano": 52 }[period] || 31;
  const points = isMobile ? Math.min(all, 8) : all;
  const step   = Math.ceil(all / points);
  return Array.from({ length: points }, (_, i) => {
    const date   = new Date(today);
    const offset = (points - 1 - i) * step;
    period.includes("Meses") || period.includes("Ano")
      ? date.setDate(date.getDate() - offset * 7)
      : date.setDate(date.getDate() - offset);
    return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}`;
  });
};