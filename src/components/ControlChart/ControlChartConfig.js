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

const DEFAULT_TABLE = [
  {
      "id": "0",
      "x0": "1.3235",
      "x1": "1.4128",
      "x2": "1.6744",
      "x3": "1.4573",
      "x4": "1.6914"
  },
  {
      "id": "1",
      "x0": "1.4314",
      "x1": "1.3592",
      "x2": "1.6075",
      "x3": "1.4666",
      "x4": "1.6109"
  },
  {
      "id": "2",
      "x0": "1.4284",
      "x1": "1.4871",
      "x2": "1.4932",
      "x3": "1.4324",
      "x4": "1.5674"
  },
  {
      "id": "3",
      "x0": "1.5028",
      "x1": "1.6352",
      "x2": "1.3841",
      "x3": "1.2831",
      "x4": "1.5507"
  },
  {
      "id": "4",
      "x0": "1.5604",
      "x1": "1.2735",
      "x2": "1.5265",
      "x3": "1.4363",
      "x4": "1.6441"
  },
  {
      "id": "5",
      "x0": "1.5955",
      "x1": "1.5451",
      "x2": "1.3574",
      "x3": "1.3281",
      "x4": "1.4198"
  },
  {
      "id": "6",
      "x0": "1.6274",
      "x1": "1.5064",
      "x2": "1.8366",
      "x3": "1.4177",
      "x4": "1.5144"
  },
  {
      "id": "7",
      "x0": "1.419",
      "x1": "1.4303",
      "x2": "1.6637",
      "x3": "1.6067",
      "x4": "1.5519"
  },
  {
      "id": "8",
      "x0": "1.3884",
      "x1": "1.7277",
      "x2": "1.5355",
      "x3": "1.5176",
      "x4": "1.3688"
  },
  {
      "id": "9",
      "x0": "1.4039",
      "x1": "1.6697",
      "x2": "3.5089",
      "x3": "1.4627",
      "x4": "1.522"
  },
  {
      "id": "10",
      "x0": "1.4158",
      "x1": "1.7667",
      "x2": "1.4278",
      "x3": "1.5928",
      "x4": "1.4181"
  },
  {
      "id": "11",
      "x0": "1.5821",
      "x1": "1.3355",
      "x2": "1.5777",
      "x3": "1.3908",
      "x4": "1.7559"
  },
  {
      "id": "12",
      "x0": "1.2856",
      "x1": "3.4106",
      "x2": "1.4447",
      "x3": "1.6398",
      "x4": "1.1928"
  },
  {
      "id": "13",
      "x0": "1.4951",
      "x1": "1.4036",
      "x2": "1.5893",
      "x3": "1.6458",
      "x4": "1.4969"
  },
  {
      "id": "14",
      "x0": "1.3589",
      "x1": "1.2863",
      "x2": "1.5996",
      "x3": "1.2497",
      "x4": "1.5471"
  },
  {
      "id": "15",
      "x0": "1.5747",
      "x1": "1.5301",
      "x2": "1.5171",
      "x3": "1.1839",
      "x4": "1.8662"
  },
  {
      "id": "16",
      "x0": "1.368",
      "x1": "1.7269",
      "x2": "1.3957",
      "x3": "1.5014",
      "x4": "1.4449"
  },
  {
      "id": "17",
      "x0": "1.4163",
      "x1": "1.3864",
      "x2": "1.3057",
      "x3": "1.621",
      "x4": "1.5573"
  },
  {
      "id": "18",
      "x0": "1.5796",
      "x1": "1.4185",
      "x2": "1.6541",
      "x3": "1.5116",
      "x4": "1.7247"
  },
  {
      "id": "19",
      "x0": "1.7106",
      "x1": "1.4412",
      "x2": "1.2361",
      "x3": "1.382",
      "x4": "1.7601"
  },
  {
      "id": "20",
      "x0": "1.4371",
      "x1": "1.5051",
      "x2": "1.3485",
      "x3": "1.567",
      "x4": "1.488"
  },
  {
      "id": "21",
      "x0": "1.4738",
      "x1": "1.5936",
      "x2": "1.6583",
      "x3": "1.4973",
      "x4": "1.472"
  },
  {
      "id": "22",
      "x0": "1.5917",
      "x1": "1.4333",
      "x2": "1.5551",
      "x3": "1.5295",
      "x4": "1.6866"
  },
  {
      "id": "23",
      "x0": "1.6399",
      "x1": "1.5243",
      "x2": "1.5705",
      "x3": "1.5563",
      "x4": "1.553"
  },
  {
      "id": "24",
      "x0": "1.5797",
      "x1": "1.3663",
      "x2": "1.624",
      "x3": "1.3732",
      "x4": "1.6887"
  }
]



const DEFAULT_LAYOUT = {
  average: {
    title: "X Chart",
    margin: { t: 40 },
    yaxis: {
      title: "Caracteristicas",
      titlefont: { color: "#1f77b4" },
      tickfont: { color: "#1f77b4" },
      showticklabels: true
    },
    xaxis: { domain: [0, 0.7] },
    yaxis2: { anchor: "x2", showticklabels: true },
    xaxis2: { domain: [0.72, 1] }
  },
  variability: {
    title: "R Chart",
    margin: { t: 40 },
    yaxis: {
      title: "Caracteristicas",
      titlefont: { color: "#1f77b4" },
      tickfont: { color: "#1f77b4" },
      showticklabels: true
    },
    xaxis: { domain: [0, 0.7] },
    yaxis2: { anchor: "x2", showticklabels: true },
    xaxis2: { domain: [0.72, 1] }
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
