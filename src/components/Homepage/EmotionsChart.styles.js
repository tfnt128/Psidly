// getMobileStyles(isMobile):
//   mobile  - ta basicamente, mobile tem espaco pra mobile
//   desktop → e pc mantem oq já tinha feito
export const getMobileStyles = (isMobile) => ({

  container: {
    display: "flex",
    flexDirection: "column",
    gap:          isMobile ? "10px" : "3vh",
    width: "100%",
    paddingLeft:  isMobile ? "10px" : "2vw",
    paddingRight: isMobile ? "10px" : "8vw",
    paddingTop:   isMobile ? "44px" : "0px", // pro voltar n ficar em cima dos outros
    boxSizing: "border-box",
    position: "relative",
    fontFamily: "'Lexend Deca', sans-serif",
  },

  backButton: {
    position: "absolute",
    top:   isMobile ? "0px"   : "-6vh",
    right: isMobile ? "10px"  : "0vw",
    fontSize: isMobile ? "12px"      : "1.2vw",
    padding:  isMobile ? "6px 14px"  : "0.8vh 2vw",
    borderRadius: "999px",
    border:     isMobile ? "1.5px solid #ff4d4d" : "0.15vw solid #ff4d4d",
    background: "rgba(255, 77, 77, 0.1)",
    color: "#ff4d4d",
    cursor: "pointer",
    fontWeight: "600",
    whiteSpace: "nowrap",
  },

  emotionTabs: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    // vai colocando pro lado com o dedo
    overflowX:       isMobile ? "auto"    : "visible",
    WebkitOverflowScrolling: "touch",     // scroll inercial no iOS
    scrollbarWidth:  isMobile ? "none"    : "auto",   // firefox
    msOverflowStyle: isMobile ? "none"    : "auto",   // IE/Edge
    gap:          isMobile ? "8px"  : "1vw",
    width: "100%",
    marginBottom: isMobile ? "6px"  : "1vh",
    paddingBottom: isMobile ? "4px" : "0", // evita cortar sombra do scroll
  },

  emotionBtn: {
    flexShrink: 0,  // nunca encolhe  garante que todos os botões apareçam
    fontSize:   isMobile ? "12px"       : "1.6vw",
    padding:    isMobile ? "6px 14px"   : "0.9vh 2.2vw",
    borderRadius: "999px",
    borderStyle: "solid",
    borderWidth: isMobile ? "1.5px"     : "0.2vw",
    cursor: "pointer",
    fontWeight: "500",
    transition: "0.2s",
    whiteSpace: "nowrap",
  },

  chartCard: {
    width: "100%",
    borderRadius: isMobile ? "14px"  : "2vw",
    background: "#0f0f1a",
    border: "1px solid #1a1a2e",
    overflow: "hidden",
  },

  cardHeader: {
    display: "flex",
    flexDirection:  isMobile ? "column"      : "row",
    justifyContent: "space-between",
    alignItems:     isMobile ? "flex-start"  : "center",
    gap:            isMobile ? "10px"        : "0",
    padding:        isMobile ? "12px 12px 8px" : "2.5vh 3vw 1.2vh",
  },

  cardTitle: {
    fontSize:   isMobile ? "13px"   : "1.8vw",
    fontWeight: "600",
    color: "#c0c8e8",
    margin: 0,
  },

  periodTabs: {
    display: "flex",
    flexWrap: "nowrap",
    gap: isMobile ? "6px" : "0.6vw",
  },

  periodBtn: {
    fontSize:     isMobile ? "11px"      : "1.2vw",
    padding:      isMobile ? "5px 10px"  : "0.6vh 1.4vw",
    borderRadius: isMobile ? "8px"       : "0.8vw",
    borderStyle: "solid",
    borderWidth:  isMobile ? "1.5px"     : "0.15vw",
    cursor: "pointer",
    transition: "0.2s",
    whiteSpace: "nowrap",
  },

  chartWrapper: {
    padding: isMobile ? "0 10px 14px"  : "0 2vw 3vh",
    height:  isMobile ? "240px"        : "55vh",
  },
});

// ative o normal, não quebra nenhum import existente
export const styles = getMobileStyles(false);