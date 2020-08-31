var trace0 = {
  x: [1, 2, 3],
  y: [4, 5, 6],
  type: "scatter",
  name: "first"
};

var trace1 = {
  x: [20, 30, 40],
  y: [50, 60, 70],
  xaxis: "x2",
  yaxis: "y2",
  type: "bar",
  orientation: "h",
  name: "second"
};

var data = [trace0, trace1];

const DEFAULT_TABLE = [{ id: 0, x0: "2", x1: "4" }];

const DEFAULT_LAYOUT = {
  average: {
    title: 'X Chart',
    margin: { t: 40 },
    yaxis: {
      title: "Caracteristicas",
      titlefont: { color: "#1f77b4" },
      tickfont: { color: "#1f77b4" }
    }
  },
  variability: {
    title: 'R Chart',
    margin: { t: 40 },
    yaxis: {
      title: "Caracteristicas",
      titlefont: { color: "#1f77b4" },
      tickfont: { color: "#1f77b4" }
    }
  }
};

const DEFAULT_OPTION_TABLE = {
  clipboard: true,
  selectable: true,
  layout: "fitDataFill",
  height: "300px",
  columns: [
    { field: "id", title: "id", hozAlign: "center" },
    {
      field: "x0",
      title: "x0",
      editor: true,
      widthGrow: 2,
      hozAlign: "center"
    },
    { field: "x1", title: "x1", editor: true, widthGrow: 2, hozAlign: "center" }
  ]
  //columna tipo vacia para insertar y comparar
};

export { DEFAULT_LAYOUT, DEFAULT_TABLE, DEFAULT_OPTION_TABLE };
