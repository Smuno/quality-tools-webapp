// plotData: function() {
//   const yLine = this.tableData.map(el => {
//     return parseFloat(el.value);
//   });
//   const comments = this.tableData.map(el => {
//     return el.name;
//   });

//   const mean = math.mean(yLine);
//   const standardDeviation = math.std(yLine);
//   const xBordes = [-2, yLine.length];

//   const xViolation = [];
//   const yViolation = [];

//   yLine.forEach((value, index) => {
//     if (value > 3 * standardDeviation + mean) {
//       xViolation.push(index);
//       yViolation.push(value);
//     }
//   });

//   const characteristicLine = {
//     name: "Characteristic",
//     type: "scatter",
//     y: yLine,
//     text: comments,
//     textposition: "top",
//     mode: "lines+markers",
//     line: {
//       color: "#016fb9",
//       width: 2
//     },
//     marker: {
//       color: "#016fb9",
//       size: 8,
//       symbol: "circle"
//     }
//   };
//   const meanLine = {
//     x: xBordes,
//     y: [mean, mean],
//     name: "Mean",
//     type: "scatter",
//     mode: "lines",
//     line: {
//       color: "#545E63",
//       width: 2
//     }
//   };
//   const upOneDeviation = {
//     x: xBordes,
//     y: [standardDeviation + mean, standardDeviation + mean],
//     name: "1σ",
//     type: "scatter",
//     mode: "lines",
//     line: {
//       color: "#e9c46a",
//       width: 2,
//       dash: "dash"
//     }
//   };
//   const upTwoDeviation = {
//     x: xBordes,
//     y: [2 * standardDeviation + mean, 2 * standardDeviation + mean],
//     name: "2σ",
//     type: "scatter",
//     mode: "lines",
//     line: {
//       color: "#f4a261",
//       width: 2,
//       dash: "dash"
//     }
//   };
//   const upThreeDeviation = {
//     x: xBordes,
//     y: [3 * standardDeviation + mean, 3 * standardDeviation + mean],
//     name: "3σ",
//     type: "scatter",
//     mode: "lines",
//     line: {
//       color: "#e76f51",
//       width: 2,
//       dash: "dash"
//     }
//   };

//   const violationMarker = {
//     x: xViolation,
//     y: yViolation,
//     name: "Violations",
//     mode: "markers",
//     type: "scatter",
//     marker: {
//       color: "#CC2936",
//       size: 14,
//       symbol: "diamond"
//     }
//   };

//   return [
//     meanLine,
//     upThreeDeviation,
//     upTwoDeviation,
//     upOneDeviation,
//     characteristicLine,
//     violationMarker
//   ];
// },




const DEFAULT_TABLE = [
  { id: "R0", x0: "2",x1:"4" },
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
  reactiveData:true,
  selectable:true,
  layout: "fitData",
  height: "400px",
  responsiveLayout:"hide",
  columns: [
    { field: "id", title: "id", hozAlign: "center" },
    { field: "x0", title: "x0", editor: true, widthGrow: 2, hozAlign: "center" },
    { field: "x1", title: "x1", editor: true, widthGrow: 2, hozAlign: "center" }
  ],
  //columna tipo vacia para insertar y comparar
};

export { DEFAULT_LAYOUT, DEFAULT_TABLE, DEFAULT_OPTION_TABLE };
