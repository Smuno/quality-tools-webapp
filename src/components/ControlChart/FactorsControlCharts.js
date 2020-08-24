const factorTable = [
  {
    n: "2.000",
    A: "2.121",
    A2: "1.880",
    A3: "2.659",
    c4: "0.798",
    B3: "0.000",
    B4: "3.267",
    B5: "0.000",
    B6: "2.606",
    d2: "1.128",
    d3: "0.853",
    D1: "0.000",
    D2: "3.686",
    D3: "0.000",
    D4: "3.267"
  },
  {
    n: "3.000",
    A: "1.732",
    A2: "1.023",
    A3: "1.954",
    c4: "0.886",
    B3: "0.000",
    B4: "2.568",
    B5: "0.000",
    B6: "2.276",
    d2: "1.693",
    d3: "0.888",
    D1: "0.000",
    D2: "4.358",
    D3: "0.000",
    D4: "2.574"
  },
  {
    n: "4.000",
    A: "1.500",
    A2: "0.729",
    A3: "1.628",
    c4: "0.921",
    B3: "0.000",
    B4: "2.266",
    B5: "0.000",
    B6: "2.088",
    d2: "2.059",
    d3: "0.880",
    D1: "0.000",
    D2: "4.698",
    D3: "0.000",
    D4: "2.282"
  },
  {
    n: "5.000",
    A: "1.342",
    A2: "0.577",
    A3: "1.427",
    c4: "0.940",
    B3: "0.000",
    B4: "2.089",
    B5: "0.000",
    B6: "1.964",
    d2: "2.326",
    d3: "0.864",
    D1: "0.000",
    D2: "4.918",
    D3: "0.000",
    D4: "2.114"
  },
  {
    n: "6.000",
    A: "1.225",
    A2: "0.483",
    A3: "1.287",
    c4: "0.952",
    B3: "0.030",
    B4: "1.970",
    B5: "0.029",
    B6: "1.874",
    d2: "2.534",
    d3: "0.848",
    D1: "0.000",
    D2: "5.078",
    D3: "0.000",
    D4: "2.004"
  },
  {
    n: "7.000",
    A: "1.134",
    A2: "0.419",
    A3: "1.182",
    c4: "0.959",
    B3: "0.118",
    B4: "1.882",
    B5: "0.113",
    B6: "1.806",
    d2: "2.704",
    d3: "0.833",
    D1: "0.204",
    D2: "5.204",
    D3: "0.076",
    D4: "1.924"
  },
  {
    n: "8.000",
    A: "1.061",
    A2: "0.373",
    A3: "1.099",
    c4: "0.965",
    B3: "0.185",
    B4: "1.815",
    B5: "0.179",
    B6: "1.751",
    d2: "2.847",
    d3: "0.820",
    D1: "0.388",
    D2: "5.306",
    D3: "0.136",
    D4: "1.864"
  },
  {
    n: "9.000",
    A: "1.000",
    A2: "0.337",
    A3: "1.032",
    c4: "0.969",
    B3: "0.239",
    B4: "1.761",
    B5: "0.232",
    B6: "1.707",
    d2: "2.970",
    d3: "0.808",
    D1: "0.547",
    D2: "5.393",
    D3: "0.184",
    D4: "1.816"
  },
  {
    n: "10.000",
    A: "0.949",
    A2: "0.308",
    A3: "0.975",
    c4: "0.973",
    B3: "0.284",
    B4: "1.716",
    B5: "0.276",
    B6: "1.669",
    d2: "3.078",
    d3: "0.797",
    D1: "0.687",
    D2: "5.469",
    D3: "0.223",
    D4: "1.777"
  },
  {
    n: "11.000",
    A: "0.905",
    A2: "0.285",
    A3: "0.927",
    c4: "0.975",
    B3: "0.321",
    B4: "1.679",
    B5: "0.313",
    B6: "1.637",
    d2: "3.173",
    d3: "0.787",
    D1: "0.811",
    D2: "5.535",
    D3: "0.256",
    D4: "1.744"
  },
  {
    n: "12.000",
    A: "0.866",
    A2: "0.266",
    A3: "0.886",
    c4: "0.978",
    B3: "0.354",
    B4: "1.646",
    B5: "0.346",
    B6: "1.610",
    d2: "3.258",
    d3: "0.778",
    D1: "0.922",
    D2: "5.594",
    D3: "0.283",
    D4: "1.717"
  },
  {
    n: "13.000",
    A: "0.832",
    A2: "0.249",
    A3: "0.850",
    c4: "0.979",
    B3: "0.382",
    B4: "1.618",
    B5: "0.374",
    B6: "1.585",
    d2: "3.336",
    d3: "0.770",
    D1: "1.025",
    D2: "5.647",
    D3: "0.307",
    D4: "1.693"
  },
  {
    n: "14.000",
    A: "0.802",
    A2: "0.235",
    A3: "0.817",
    c4: "0.981",
    B3: "0.406",
    B4: "1.594",
    B5: "0.399",
    B6: "1.563",
    d2: "3.407",
    d3: "0.763",
    D1: "1.118",
    D2: "5.696",
    D3: "0.328",
    D4: "1.672"
  },
  {
    n: "15.000",
    A: "0.775",
    A2: "0.223",
    A3: "0.789",
    c4: "0.982",
    B3: "0.428",
    B4: "1.572",
    B5: "0.421",
    B6: "1.544",
    d2: "3.472",
    d3: "0.756",
    D1: "1.203",
    D2: "5.741",
    D3: "0.347",
    D4: "1.653"
  },
  {
    n: "16.000",
    A: "0.750",
    A2: "0.212",
    A3: "0.763",
    c4: "0.984",
    B3: "0.448",
    B4: "1.552",
    B5: "0.440",
    B6: "1.526",
    d2: "3.532",
    d3: "0.750",
    D1: "1.282",
    D2: "5.782",
    D3: "0.363",
    D4: "1.637"
  },
  {
    n: "17.000",
    A: "0.728",
    A2: "0.203",
    A3: "0.739",
    c4: "0.985",
    B3: "0.466",
    B4: "1.534",
    B5: "0.458",
    B6: "1.511",
    d2: "3.588",
    d3: "0.744",
    D1: "1.356",
    D2: "5.820",
    D3: "0.378",
    D4: "1.622"
  },
  {
    n: "18.000",
    A: "0.707",
    A2: "0.194",
    A3: "0.718",
    c4: "0.985",
    B3: "0.482",
    B4: "1.518",
    B5: "0.475",
    B6: "1.496",
    d2: "3.640",
    d3: "0.739",
    D1: "1.424",
    D2: "5.856",
    D3: "0.391",
    D4: "1.608"
  },
  {
    n: "19.000",
    A: "0.688",
    A2: "0.187",
    A3: "0.698",
    c4: "0.986",
    B3: "0.497",
    B4: "1.503",
    B5: "0.490",
    B6: "1.483",
    d2: "3.689",
    d3: "0.734",
    D1: "1.487",
    D2: "5.891",
    D3: "0.403",
    D4: "1.597"
  },
  {
    n: "20.000",
    A: "0.671",
    A2: "0.180",
    A3: "0.680",
    c4: "0.987",
    B3: "0.510",
    B4: "1.490",
    B5: "0.504",
    B6: "1.470",
    d2: "3.735",
    d3: "0.729",
    D1: "1.549",
    D2: "5.921",
    D3: "0.415",
    D4: "1.585"
  },
  {
    n: "21.000",
    A: "0.655",
    A2: "0.173",
    A3: "0.663",
    c4: "0.988",
    B3: "0.523",
    B4: "1.477",
    B5: "0.516",
    B6: "1.459",
    d2: "3.778",
    d3: "0.724",
    D1: "1.605",
    D2: "5.951",
    D3: "0.425",
    D4: "1.575"
  },
  {
    n: "22.000",
    A: "0.640",
    A2: "0.167",
    A3: "0.647",
    c4: "0.988",
    B3: "0.534",
    B4: "1.466",
    B5: "0.528",
    B6: "1.448",
    d2: "3.819",
    d3: "0.720",
    D1: "1.659",
    D2: "5.979",
    D3: "0.434",
    D4: "1.566"
  },
  {
    n: "23.000",
    A: "0.626",
    A2: "0.162",
    A3: "0.633",
    c4: "0.989",
    B3: "0.545",
    B4: "1.455",
    B5: "0.539",
    B6: "1.438",
    d2: "3.858",
    d3: "0.716",
    D1: "1.710",
    D2: "6.006",
    D3: "0.443",
    D4: "1.557"
  },
  {
    n: "24.000",
    A: "0.612",
    A2: "0.157",
    A3: "0.619",
    c4: "0.989",
    B3: "0.555",
    B4: "1.445",
    B5: "0.549",
    B6: "1.429",
    d2: "3.895",
    d3: "0.712",
    D1: "1.759",
    D2: "6.031",
    D3: "0.451",
    D4: "1.548"
  },
  {
    n: "25.000",
    A: "0.600",
    A2: "0.153",
    A3: "0.606",
    c4: "0.990",
    B3: "0.565",
    B4: "1.435",
    B5: "0.559",
    B6: "1.420",
    d2: "3.931",
    d3: "0.708",
    D1: "1.806",
    D2: "6.056",
    D3: "0.459",
    D4: "1.541"
  }
];

/**
 *
 * Returns Objects with the factors for XR and XS charts
 * @param {Number} sampleSize
 * @returns {( null |Object)} object with factores .XR and .XS, or Null if n<=1 or n>25
 */

function factorsControlCharts(sampleSize) {
  if (sampleSize >= 2 && sampleSize <= 25) {
    const rowOfFactors = factorTable.find(el => {
      return parseInt(el.n) === sampleSize;
    });
    return {
      XR: {
        fProcess: rowOfFactors.A2,
        fUCL: rowOfFactors.D4,
        fLCL: rowOfFactors.D3
      },
      XS: {
        fProcess: rowOfFactors.A3,
        fUCL: rowOfFactors.B4,
        fLCL: rowOfFactors.B3
      }
    };
  } else {
    return null;
  }
}

export { factorsControlCharts };