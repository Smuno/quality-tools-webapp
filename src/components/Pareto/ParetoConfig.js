const DEFAULT_TABLE = [
  { id: 1, name: "Cables rotos", value: 22 },
  { id: 2, name: "Sin materiales", value: 10 }
];

const DEFAULT_LAYOUT = {
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

const DEFAULT_OPTION_TABLE = {
  clipboard: true,
  layoutColumnsOnNewData: true,
  layout: "fitColumns",
  height: "400px",
  selectable: true,
  columns: [
    { field: "id", title: "ID", visible: false },
    { field: "name", title: "Name", editor: true, widthGrow: 2 },
    { field: "value", title: "Value", editor: true, hozAlign: "center" }
  ]
};

export { DEFAULT_LAYOUT, DEFAULT_TABLE,DEFAULT_OPTION_TABLE};
