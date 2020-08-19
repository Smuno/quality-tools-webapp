const DEFAULT_TABLE = [
  { name: "Cables rotos", value: "2" },
  { name: "", value: "4" },
  { name: "", value: "3" },
  { name: "Operador Atrasado", value: "4.3" },
  { name: "", value: "3.1" },
  { name: "", value: "2.9"},
  { name: "Caida de herramienta", value: "2" },
  { name: "", value: "1" },
  { name: "", value: "3.7" },
  { name: "", value: "3.2" },
];

const DEFAULT_LAYOUT = {
  title: "Control Chart",
  margin: { t: 40 },
  yaxis: {
    title: "Caracteristicas",
    titlefont: { color: "#1f77b4" },
    tickfont: { color: "#1f77b4" }
  }
};

const DEFAULT_OPTION_TABLE = {
  clipboard: true,
  layoutColumnsOnNewData: true,
  layout: "fitColumns",
  height: "400px",
  columns: [
    { field: "value", title: "Value", editor: true, hozAlign: "center" },
    { field: "name", title: "Description", editor: true, widthGrow: 2 }
  ],
  //columna tipo vacia para insertar y comparar
  emptyColumn: { name: "", value: "0" }
};

export { DEFAULT_LAYOUT, DEFAULT_TABLE, DEFAULT_OPTION_TABLE };
