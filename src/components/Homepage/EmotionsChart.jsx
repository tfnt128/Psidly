import React, { useState, useMemo } from "react";
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

import { styles } from "./EmotionsChart.styles";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

const EMOTIONS = ["Tristeza", "Felicidade", "Ansiedade", "Raiva", "Estresse"];
const PERIODS = ["7 Dias", "15 Dias", "1 Mês", "6 Meses", "1 Ano"];

// cada emocao tem sua cor, se nicolas ou pablo escolher outra cor, eu mudo
const coresPorEmocao = {
  Tristeza:    "#4d8bff", // azul
  Felicidade:  "#36e900", // amarelo e dps mudei pra verde
  Ansiedade:   "#ff05c9", // laranja e mudei pra roxo
  Raiva:       "#ff3b3b", // vermelho
  Estresse:    "#e05c2a", // vermelho amarelado
};

export default function EmotionsChart() {
  const [selectedEmotion, setSelectedEmotion] = useState("Tristeza");
  const [selectedPeriod, setSelectedPeriod] = useState("1 Mês");

  // pega a cor da emocao atual pra usar no grafico e nos detalhes
  const corAtual = coresPorEmocao[selectedEmotion];

  const chartData = useMemo(() => ({
    labels: generateLabels(selectedPeriod),
    datasets: [{
      fill: true,
      label: selectedEmotion,
      data: generateData(selectedPeriod),
      borderColor: corAtual,
      backgroundColor: (context) => {
        const { ctx, chartArea } = context.chart;
        if (!chartArea) return null;

        // faz coisa bonita com a cor da emocao atual
        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradient.addColorStop(0, corAtual + "47"); // sla, isso foi indicação do chat e ficou legal
        gradient.addColorStop(1, corAtual + "00"); // mesma coisa
        return gradient;
      },
      borderWidth: 3,
      pointRadius: 5,
      pointBackgroundColor: corAtual,
      tension: 0.1,
    }],
  }), [selectedEmotion, selectedPeriod, corAtual]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: { top: 60, left: 30, right: 40, bottom: 30 }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: "#1a1a2e",
        titleFont: { size: 38, family: "'Lexend Deca', sans-serif", weight: "bold" },
        bodyFont: { size: 36, family: "'Lexend Deca', sans-serif" },
        padding: 30,
        cornerRadius: 15,
        borderColor: corAtual, // borda do tooltip muda com a emocao tambem
        borderWidth: 2,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 10,
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
    <div style={styles.container}>
      <button
        onClick={() => window.location.href = "/Graphicspage"}
        style={styles.backButton}
      >
        Voltar
      </button>

      <div style={styles.emotionTabs}>
        {EMOTIONS.map((emotion) => {
          const corBotao = coresPorEmocao[emotion];
          const selecionado = selectedEmotion === emotion;
          return (
            <button
              key={emotion}
              onClick={() => setSelectedEmotion(emotion)}
              style={{
                ...styles.emotionBtn,
                // cada botao usa a propria cor quando selecionado
                borderColor: selecionado ? corBotao : "#d1d5db",
                background: selecionado ? corBotao + "1a" : "transparent", // 10% opacidade
                color: selecionado ? corBotao : "#9ca3af",
              }}
            >
              {emotion}
            </button>
          );
        })}
      </div>

      <div style={styles.chartCard}>
        <div style={styles.cardHeader}>
          <h2 style={styles.cardTitle}>
            {selectedEmotion} ao longo do tempo
          </h2>

          <div style={styles.periodTabs}>
            {PERIODS.map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                style={{
                  ...styles.periodBtn,
                  borderColor: selectedPeriod === period ? corAtual : "#2a2a4a",
                  background: selectedPeriod === period ? corAtual + "22" : "transparent",
                  color: selectedPeriod === period ? corAtual : "#555577",
                }}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.chartWrapper}>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

// gera dados aleatorios com base no periodo
const generateData = (period) => {
  const points = { "7 Dias": 7, "15 Dias": 15, "1 Mês": 31, "6 Meses": 26, "1 Ano": 52 }[period] || 31;
  return Array.from({ length: points }, () => Math.floor(Math.random() * 10) + 1);
};

const generateLabels = (period) => {
  const today = new Date();
  const points = { "7 Dias": 7, "15 Dias": 15, "1 Mês": 31, "6 Meses": 26, "1 Ano": 52 }[period] || 31;
  return Array.from({ length: points }, (_, i) => {
    const date = new Date(today);
    period.includes("Meses") || period.includes("Ano")
      ? date.setDate(date.getDate() - (points - 1 - i) * 7)
      : date.setDate(date.getDate() - (points - 1 - i));
    return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}`;
  });
};