const LAYOUT = {
    title: "Pareto",
    margin: { t: 40 },
    yaxis: {
      title: "# Ocurrencias",
      titlefont: { color: "#1f77b4" },
      tickfont: { color: "#1f77b4" }
    },
    yaxis2: {
      title: "% acumulativo",
      titlefont: { color: "#ff7f0e" },
      tickfont: { color: "#ff7f0e" },
      side: "right",
      overlaying: "y",
      range: [0, 110]
    }
  };

  export {LAYOUT}