//Input             Inspection level,Lot Size
const SampleSizeTable = [
  {
    min: "2",
    max: "8",
    "S-1": "A",
    "S-2": "A",
    "S-3": "A",
    "S-4": "A",
    I: "A",
    II: "A",
    III: "B"
  },
  {
    min: "9",
    max: "15",
    "S-1": "A",
    "S-2": "A",
    "S-3": "A",
    "S-4": "A",
    I: "A",
    II: "B",
    III: "C"
  },
  {
    min: "16",
    max: "25",
    "S-1": "A",
    "S-2": "A",
    "S-3": "B",
    "S-4": "B",
    I: "B",
    II: "C",
    III: "D"
  },
  {
    min: "26",
    max: "50",
    "S-1": "A",
    "S-2": "B",
    "S-3": "B",
    "S-4": "C",
    I: "C",
    II: "D",
    III: "E"
  },
  {
    min: "51",
    max: "90",
    "S-1": "B",
    "S-2": "B",
    "S-3": "C",
    "S-4": "C",
    I: "C",
    II: "E",
    III: "F"
  },
  {
    min: "91",
    max: "150",
    "S-1": "B",
    "S-2": "B",
    "S-3": "C",
    "S-4": "D",
    I: "D",
    II: "F",
    III: "G"
  },
  {
    min: "151",
    max: "280",
    "S-1": "B",
    "S-2": "C",
    "S-3": "D",
    "S-4": "E",
    I: "E",
    II: "G",
    III: "H"
  },
  {
    min: "281",
    max: "500",
    "S-1": "B",
    "S-2": "C",
    "S-3": "D",
    "S-4": "E",
    I: "F",
    II: "H",
    III: "J"
  },
  {
    min: "501",
    max: "1200",
    "S-1": "C",
    "S-2": "C",
    "S-3": "E",
    "S-4": "F",
    I: "G",
    II: "J",
    III: "K"
  },
  {
    min: "1201",
    max: "3200",
    "S-1": "C",
    "S-2": "D",
    "S-3": "E",
    "S-4": "G",
    I: "H",
    II: "K",
    III: "L"
  },
  {
    min: "3201",
    max: "10000",
    "S-1": "C",
    "S-2": "D",
    "S-3": "F",
    "S-4": "G",
    I: "J",
    II: "L",
    III: "M"
  },
  {
    min: "10001",
    max: "35000",
    "S-1": "C",
    "S-2": "D",
    "S-3": "F",
    "S-4": "H",
    I: "K",
    II: "M",
    III: "N"
  },
  {
    min: "35001",
    max: "150000",
    "S-1": "D",
    "S-2": "E",
    "S-3": "G",
    "S-4": "J",
    I: "L",
    II: "N",
    III: "P"
  },
  {
    min: "150001",
    max: "500000",
    "S-1": "D",
    "S-2": "E",
    "S-3": "G",
    "S-4": "J",
    I: "M",
    II: "P",
    III: "Q"
  },
  {
    min: "500001",
    max: "100000000000",
    "S-1": "D",
    "S-2": "E",
    "S-3": "H",
    "S-4": "K",
    I: "N",
    II: "Q",
    III: "R"
  }
];
/**
 * determineLetter(inspectionLevel,lotSize)
 *
 * @param {*} inspectionLevel
 * @param {*} lotSize
 * @returns
 */

const letterList=
[ "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "M",
  "N",
  "P",
  "Q",
  "R"
]
const sampleSizeList=[2,3,5,8,13,20,32,50,80,125,200,315,500,800,1250]


function determineSampleSize(letterfound){
  return sampleSizeList[ letterList.indexOf(letterfound) ]
}

function determineLetter(inspectionLevel, lotSize) {
  console.log("Executing determineLetter");
  const tableIndex = SampleSizeTable.findIndex(el => {
    if (parseInt(el.min) <= lotSize && parseInt(el.max) >= lotSize) {
      return true;
    }
    return false;
  });
  if (tableIndex == -1) {
    console.log("error -1");
    return tableIndex;
  } else {
    console.log("Index: ", tableIndex);
    return SampleSizeTable[tableIndex][inspectionLevel];
  }
}

const listInspectionLevels = [
  { value: null, text: "Elige nivel de inspeccion" },
  { value: "S-1", text: "S-1 Especial 1" },
  { value: "S-2", text: "S-2 Especial 2" },
  { value: "S-3", text: "S-3 Especial 3" },
  { value: "I", text: "Inspeccion Relajada" },
  { value: "II", text: "Inspeccion Normal" },
  { value: "III", text: "Inspeccion Extricta" }
];

export { determineLetter, listInspectionLevels , determineSampleSize , sampleSizeList};
