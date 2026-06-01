import React, { useState, useMemo, useEffect } from "react";
import { listAvaliations } from "../../services/api";
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
import { useTranslation } from 'react-i18next';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

// chaves estáveis para mapear dias — independente do idioma
const PERIOD_KEYS = ["7d", "15d", "1m", "6m", "1a"];

const diasPorPeriodoKey = {
  "7d":  7,
  "15d": 15,
  "1m":  30,
  "6m":  180,
  "1a":  365,
};

// converte o nome da emocao do front pro campo que vem do back
const camposPorEmocao = {
  tristeza:   "tristeza",
  alegria:    "alegria",
  ansiedade:  "ansiedade",
  raiva:      "raiva",
  estresse:   "estresse",
};

// chaves i18n → cor (estável, independente do idioma)
const coresPorChave = {
  tristeza:   "#4d8bff",
  alegria:    "#36e900",
  ansiedade:  "#ff05c9",
  raiva:      "#ff3b3b",
  estresse:   "#e05c2a",
};

function formatarData(date) {
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const a = date.getFullYear();
  return `${d}/${m}/${a}`;
}

export default function EmotionsChart({ patientId, patientName }) {
  const { t } = useTranslation();

  // chaves de emoção (estáveis, não mudam com idioma)
  const EMOTION_KEYS = ["tristeza", "alegria", "ansiedade", "raiva", "estresse"];

  const [selectedKey,       setSelectedKey]       = useState("tristeza");
  const [selectedPeriodIdx, setSelectedPeriodIdx] = useState(2);
  const [isMobile,          setIsMobile]          = useState(false);
  const [showAI,            setShowAI]            = useState(false);

  const [currentLabels, setCurrentLabels] = useState([]);
  const [currentData,   setCurrentData]   = useState([]);

  useEffect(() => {
    const check = () => setIsMobile(window.screen.width < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const selectedPeriodKey = PERIOD_KEYS[selectedPeriodIdx];
  const corAtual          = coresPorChave[selectedKey];
  const s                 = getMobileStyles(isMobile);

  useEffect(() => {
    if (!patientId) return;

    async function buscar() {
      const hoje   = new Date();
      const inicio = new Date();
      inicio.setDate(hoje.getDate() - diasPorPeriodoKey[selectedPeriodKey]);

      const json = await listAvaliations(
        patientId,
        formatarData(inicio),
        formatarData(hoje)
      );

      if (!json?.success) return;

      const ordenado = [...json.data].sort((a, b) => {
        const [dA, mA, aA] = a.date.split("/");
        const [dB, mB, aB] = b.date.split("/");
        return new Date(`${aA}-${mA}-${dA}`) - new Date(`${aB}-${mB}-${dB}`);
      });

      const campo = camposPorEmocao[selectedKey];
      setCurrentData(ordenado.map((av) => av[campo]));
      setCurrentLabels(ordenado.map((av) => av.date.slice(0, 5)));
    }

    buscar();
  }, [patientId, selectedKey, selectedPeriodKey]);

  const chartData = useMemo(() => ({
    labels: currentLabels,
    datasets: [{
      fill: true,
      label: t(selectedKey),
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
      pointRadius:          isMobile ? 5 : 7,
      pointHoverRadius:     isMobile ? 7 : 9,
      pointBackgroundColor: corAtual,
      spanGaps: true,
      tension: 0.1,
    }],
  }), [selectedKey, corAtual, isMobile, currentLabels, currentData, t]);

  const chartOptions = isMobile
    ? {
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: { top: 12, left: 0, right: 8, bottom: 8 } },
        elements: { point: { radius: 5 } },
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
        elements: { point: { radius: 7 } },
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
          {t('voltar')}
        </button>

        {/* botoes de emocao */}
        <div style={s.emotionTabs}>
          {EMOTION_KEYS.map((key) => {
            const cor = coresPorChave[key];
            const sel = selectedKey === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedKey(key)}
                style={{
                  ...s.emotionBtn,
                  borderColor: sel ? cor : "#d1d5db",
                  background:  sel ? cor + "1a" : "transparent",
                  color:       sel ? cor : "#9ca3af",
                }}
              >
                {t(key)}
              </button>
            );
          })}
        </div>

        {/* card do grafico */}
        <div style={s.chartCard}>
          <div style={s.cardHeader}>
            <h2 style={s.cardTitle}>{t(selectedKey)} {t('aoLongoDoTempo')}</h2>

            <div style={s.periodTabs}>
              {PERIOD_KEYS.map((key, idx) => {
                const label = isMobile ? t(`periodo${key}Curto`) : t(`periodo${key}`);
                return (
                  <button
                    key={key}
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
                );
              })}
            </div>
          </div>

          <div style={s.chartWrapper}>
            {currentData.length === 0 ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#555577", fontFamily: "'Lexend Deca', sans-serif", fontSize: isMobile ? "12px" : "1.2vw" }}>
                {t('nenhumaAvaliacao')}
              </div>
            ) : (
              <Line data={chartData} options={chartOptions} />
            )}
          </div>
        </div>
      </div>

      <button
        onClick={() => setShowAI(true)}
        title={t('analisarIA')}
        style={{
          position:       "fixed",
          bottom:         isMobile ? "100px" : "2.5vw",
          right:          isMobile ? "16px"  : "2vw",
          width:          isMobile ? "48px"  : "3.5vw",
          height:         isMobile ? "48px"  : "3.5vw",
          minWidth:       "48px",
          minHeight:      "48px",
          borderRadius:   "50%",
          border:         `2px solid ${corAtual}`,
          background:     `linear-gradient(135deg, ${corAtual}33, ${corAtual}11)`,
          backdropFilter: "blur(8px)",
          color:          corAtual,
          fontSize:       isMobile ? "18px" : "1.4vw",
          cursor:         "pointer",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          boxShadow:      `0 0 20px ${corAtual}44`,
          transition:     "0.2s",
          zIndex:         100,
          fontFamily:     "'Lexend Deca', sans-serif",
        }}
      >
        ✦
      </button>

      {showAI && (
        <AIAnalysisModal
          onClose={() => setShowAI(false)}
          patientName={patientName}
          emotion={t(selectedKey)}
          period={t(`periodo${selectedPeriodKey}`)}
          labels={currentLabels}
          data={currentData}
          cor={corAtual}
        />
      )}
    </>
  );
}