import { useState, useEffect, useRef, useCallback } from "react";

const EMOTIONS = ["Tristeza", "Felicidade", "Ansiedade", "Raiva", "Estresse"];
const PERIODS = ["7 Dias", "15 Dias", "1 Mês", "6 Meses", "1 Ano"];

const generateData = (emotion, period) => {
    const lengths = { "7 Dias": 7, "15 Dias": 15, "1 Mês": 31, "6 Meses": 26, "1 Ano": 52 };
    const n = lengths[period] || 31;
    return Array.from({ length: n }, () => Math.floor(Math.random() * 10) + 1);
};

const generateLabels = (period) => {
    const today = new Date();
    const lengths = { "7 Dias": 7, "15 Dias": 15, "1 Mês": 31, "6 Meses": 26, "1 Ano": 52 };
    const n = lengths[period] || 31;
    const labels = [];
    for (let i = n - 1; i >= 0; i--) {
        const d = new Date(today);
        if (period === "6 Meses" || period === "1 Ano") d.setDate(d.getDate() - i * 7);
        else d.setDate(d.getDate() - i);
        labels.push(`${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`);
    }
    return labels;
};

function LineChart({ data, labels, emotion }) {
    const svgRef = useRef(null);
    const containerRef = useRef(null);
    const [tooltip, setTooltip] = useState(null);

    const draw = useCallback(() => {
        if (!svgRef.current || !containerRef.current) return;

        const W = containerRef.current.clientWidth || 1200;
        // 55vh da viewport REAL (sem zoom) = window.innerHeight já considera zoom
        const H = Math.max(window.innerHeight * 0.55, 400);
        // Padding em proporção da largura real do bglh
        const px = W * 0.06;
        const py = H * 0.06;
        const pad = { top: py, right: px * 0.5, bottom: py * 2.2, left: px };
        const w = W - pad.left - pad.right;
        const h = H - pad.top - pad.bottom;
        const max = 10;

        // Tamanho de fonte proporcional ao bglh real
        const fs = Math.max(W * 0.018, 11); // ~1.8% da largura real

        const svg = svgRef.current;
        svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
        svg.setAttribute("width", W);
        svg.setAttribute("height", H);
        svg.innerHTML = `
            <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#4d8bff" stop-opacity="0.28"/>
                    <stop offset="100%" stop-color="#4d8bff" stop-opacity="0"/>
                </linearGradient>
            </defs>
        `;

        const ns = "http://www.w3.org/2000/svg";

        // Grid + Y labels
        for (let i = 0; i <= 10; i++) {
            const y = pad.top + h - (i / max) * h;

            const gl = document.createElementNS(ns, "line");
            gl.setAttribute("x1", pad.left); gl.setAttribute("x2", pad.left + w);
            gl.setAttribute("y1", y); gl.setAttribute("y2", y);
            gl.setAttribute("stroke", "#1e1e38");
            gl.setAttribute("stroke-width", "1.5");
            if (i % 2 !== 0) gl.setAttribute("stroke-dasharray", "5,6");
            svg.appendChild(gl);

            const yt = document.createElementNS(ns, "text");
            yt.setAttribute("x", pad.left - fs * 0.6);
            yt.setAttribute("y", y + fs * 0.4);
            yt.setAttribute("fill", "#7777bb");
            yt.setAttribute("font-size", fs);
            yt.setAttribute("text-anchor", "end");
            yt.textContent = i;
            svg.appendChild(yt);
        }

        // Y axis label
        const yl = document.createElementNS(ns, "text");
        yl.setAttribute("x", fs);
        yl.setAttribute("y", H / 2);
        yl.setAttribute("fill", "#7777bb");
        yl.setAttribute("font-size", fs * 0.9);
        yl.setAttribute("text-anchor", "middle");
        yl.setAttribute("transform", `rotate(-90,${fs},${H / 2})`);
        yl.textContent = "Nível (0-10)";
        svg.appendChild(yl);

        const xs = data.map((_, i) => pad.left + (i / Math.max(data.length - 1, 1)) * w);
        const ys = data.map((v) => pad.top + h - (v / max) * h);

        // Area fill
        let areaD = `M ${xs[0]} ${pad.top + h}`;
        xs.forEach((x, i) => { areaD += ` L ${x} ${ys[i]}`; });
        areaD += ` L ${xs[xs.length - 1]} ${pad.top + h} Z`;
        const area = document.createElementNS(ns, "path");
        area.setAttribute("d", areaD);
        area.setAttribute("fill", "url(#areaGrad)");
        svg.appendChild(area);

        // Line crlh n aguenta mais
        let lineD = `M ${xs[0]} ${ys[0]}`;
        xs.forEach((x, i) => { if (i > 0) lineD += ` L ${x} ${ys[i]}`; });
        const linePath = document.createElementNS(ns, "path");
        linePath.setAttribute("d", lineD);
        linePath.setAttribute("stroke", "#4d8bff");
        linePath.setAttribute("stroke-width", Math.max(W * 0.003, 2));
        linePath.setAttribute("fill", "none");
        svg.appendChild(linePath);

        // X labels
        const step = Math.max(1, Math.ceil(data.length / 10));
        data.forEach((v, i) => {
            if (i % step === 0 || i === data.length - 1) {
                const xt = document.createElementNS(ns, "text");
                xt.setAttribute("x", xs[i]);
                xt.setAttribute("y", H - fs * 0.4);
                xt.setAttribute("fill", "#7777bb");
                xt.setAttribute("font-size", fs);
                xt.setAttribute("text-anchor", "middle");
                xt.textContent = labels[i];
                svg.appendChild(xt);
            }
        });

        // Dots + hit areas
        const dotR = Math.max(W * 0.005, 4);
        data.forEach((v, i) => {
            const dot = document.createElementNS(ns, "circle");
            dot.setAttribute("cx", xs[i]); dot.setAttribute("cy", ys[i]);
            dot.setAttribute("r", dotR);
            dot.setAttribute("fill", "#4d8bff");
            dot.setAttribute("stroke", "#0d0d1a");
            dot.setAttribute("stroke-width", dotR * 0.5);
            dot.setAttribute("style", "pointer-events:none");
            svg.appendChild(dot);

            const hit = document.createElementNS(ns, "circle");
            hit.setAttribute("cx", xs[i]); hit.setAttribute("cy", ys[i]);
            hit.setAttribute("r", dotR * 4);
            hit.setAttribute("fill", "transparent");
            hit.setAttribute("style", "cursor:pointer");
            hit.addEventListener("mouseenter", () => {
                setTooltip({ pctX: xs[i] / W, pctY: ys[i] / H, label: labels[i], value: v });
            });
            hit.addEventListener("mouseleave", () => setTooltip(null));
            svg.appendChild(hit);
        });

    }, [data, labels]);

    useEffect(() => {
        draw();
        const ro = new ResizeObserver(draw);
        if (containerRef.current) ro.observe(containerRef.current);
        window.addEventListener("resize", draw);
        return () => { ro.disconnect(); window.removeEventListener("resize", draw); };
    }, [draw]);

    // tamanho do tool proporcional ao bglh real, mas com um mínimo pra não ficar ilegível em telas pequenas
    const ttFs = typeof window !== "undefined" ? Math.max((containerRef.current?.clientWidth || 800) * 0.018, 12) : 14;

    return (
        <div ref={containerRef} style={{ width: "100%", position: "relative" }}>
            <svg ref={svgRef} style={{ display: "block", width: "100%" }} />

            {tooltip && (
                <div style={{
                    position: "absolute",
                    top: `calc(${tooltip.pctY * 100}% - ${ttFs * 6}px)`,
                    left: tooltip.pctX > 0.72 ? "auto" : `calc(${tooltip.pctX * 100}%)`,
                    right: tooltip.pctX > 0.72 ? `calc(${(1 - tooltip.pctX) * 100}%)` : "auto",
                    background: "#1a1a2e",
                    border: "1px solid #2a2a4a",
                    borderRadius: `${ttFs * 0.8}px`,
                    padding: `${ttFs * 0.8}px ${ttFs * 1.2}px`,
                    pointerEvents: "none",
                    zIndex: 20,
                    minWidth: `${ttFs * 9}px`,
                    boxShadow: "0 4px 24px #0008",
                }}>
                    <div style={{ color: "#8888aa", fontSize: ttFs, marginBottom: ttFs * 0.5 }}>
                        Data: {tooltip.label}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: ttFs * 0.6 }}>
                        <span style={{
                            display: "inline-block",
                            width: ttFs * 0.7, height: ttFs * 0.7,
                            borderRadius: "3px", background: "#4d8bff", flexShrink: 0,
                        }} />
                        <span style={{ color: "#c0c8e8", fontSize: ttFs, flex: 1 }}>{emotion}</span>
                        <span style={{ color: "#fff", fontSize: ttFs * 1.1, fontWeight: 700 }}>{tooltip.value}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function EmotionsChart({ patientName }) {
    const [emotion, setEmotion] = useState("Tristeza");
    const [period, setPeriod] = useState("1 Mês");
    const [data, setData] = useState(() => generateData("Tristeza", "1 Mês"));
    const [labels, setLabels] = useState(() => generateLabels("1 Mês"));

    const handleEmotion = (e) => {
        setEmotion(e);
        setData(generateData(e, period));
    };

    const handlePeriod = (p) => {
        setPeriod(p);
        setData(generateData(emotion, p));
        setLabels(generateLabels(p));
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "3vh", width: "100%" }}>

            {/* Tabs de emoção — font-size em vw para escalar com a tela real */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1.2vw" }}>
                {EMOTIONS.map((e) => (
                    <button
                        key={e}
                        onClick={() => handleEmotion(e)}
                        style={{
                            fontFamily: "'Lexend Deca', sans-serif",
                            fontSize: "1.6vw",
                            padding: "0.9vh 2.2vw",
                            borderRadius: "9999px",
                            border: emotion === e ? "0.2vw solid #60a5fa" : "0.2vw solid #d1d5db",
                            background: emotion === e ? "rgba(96,165,250,0.1)" : "transparent",
                            color: emotion === e ? "#60a5fa" : "#9ca3af",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            fontWeight: 500,
                            whiteSpace: "nowrap",
                        }}
                    >
                        {e}
                    </button>
                ))}
            </div>

            {/* telinha do grafico */}
            <div style={{
                width: "100%",
                borderRadius: "2vw",
                background: "#0f0f1a",
                border: "1px solid #1a1a2e",
                boxShadow: "0 8px 40px #0006",
                overflow: "hidden",
            }}>
                {/* cabecalho */}
                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1.5vw",
                    padding: "2.5vh 3vw 1.2vh",
                }}>
                    <span style={{
                        fontFamily: "'Lexend Deca', sans-serif",
                        fontSize: "1.8vw",
                        fontWeight: 600,
                        color: "#c0c8e8",
                    }}>
                        {emotion} ao longo do tempo
                    </span>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6vw" }}>
                        {PERIODS.map((p) => (
                            <button
                                key={p}
                                onClick={() => handlePeriod(p)}
                                style={{
                                    fontFamily: "'Lexend Deca', sans-serif",
                                    fontSize: "1.2vw",
                                    padding: "0.6vh 1.4vw",
                                    borderRadius: "0.8vw",
                                    border: period === p ? "0.15vw solid #4d8bff" : "0.15vw solid #2a2a4a",
                                    background: period === p ? "#1e2a4a" : "transparent",
                                    color: period === p ? "#4d8bff" : "#555577",
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>

                {/* grafico */}
                <div style={{ padding: "0 2vw 3vh" }}>
                    <LineChart data={data} labels={labels} emotion={emotion} />
                </div>
            </div>
        </div>
    );
}