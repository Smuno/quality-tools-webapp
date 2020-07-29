const NormalInspectionTable = [
  {
    aql: 0.01,
    letters: [
      "A",
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
    ],
    rules: {
      acceptanceNumber: 0,
      rejectionNumber: 1
    }
  },
  {
    aql: 0.015,
    letters: [
      "A",
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
    ],
    rules: {
      acceptanceNumber: 0,
      rejectionNumber: 1
    }
  },
  {
    aql: 0.025,
    letters: [
      "A",
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
      "Q"
    ],
    rules: {
      acceptanceNumber: 0,
      rejectionNumber: 1
    }
  },
  {
    aql: 0.025,
    letters: ["R"],
    rules: {
      acceptanceNumber: 1,
      rejectionNumber: 2
    }
  },
  {
    aql: 0.04,
    letters: ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N"],
    rules: {
      acceptanceNumber: 0,
      rejectionNumber: 1
    }
  },
  {
    aql: 0.04,
    letters: ["P", "Q"],
    rules: {
      acceptanceNumber: 1,
      rejectionNumber: 2
    }
  },
  {
    aql: 0.04,
    letters: ["R"],
    rules: {
      acceptanceNumber: 2,
      rejectionNumber: 3
    }
  },
  {
    aql: 0.065,
    letters: ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M"],
    rules: {
      acceptanceNumber: 0,
      rejectionNumber: 1
    }
  },
  {
    aql: 0.065,
    letters: ["N", "P"],
    rules: {
      acceptanceNumber: 1,
      rejectionNumber: 2
    }
  },
  {
    aql: 0.065,
    letters: ["Q"],
    rules: {
      acceptanceNumber: 2,
      rejectionNumber: 3
    }
  },
  {
    aql: 0.065,
    letters: ["R"],
    rules: {
      acceptanceNumber: 3,
      rejectionNumber: 4
    }
  },
  {
    aql: 0.1,
    letters: ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L"],
    rules: {
      acceptanceNumber: 0,
      rejectionNumber: 1
    }
  },
  {
    aql: 0.1,
    letters: ["M", "N"],
    rules: {
      acceptanceNumber: 1,
      rejectionNumber: 2
    }
  },
  {
    aql: 0.1,
    letters: ["P"],
    rules: {
      acceptanceNumber: 2,
      rejectionNumber: 3
    }
  },
  {
    aql: 0.1,
    letters: ["Q"],
    rules: {
      acceptanceNumber: 3,
      rejectionNumber: 4
    }
  },
  {
    aql: 0.1,
    letters: ["R"],
    rules: {
      acceptanceNumber: 5,
      rejectionNumber: 6
    }
  }
];

const listAql = [
  0.01,
  0.015,
  0.04,
  0.065,
  0.1,
  0.15,
  0.25,
  0.4,
  0.65,
  1,
  1.5,
  2.5,
  4,
  6.5,
  10,
  15,
  25,
  40,
  65,
  100,
  150,
  250,
  400,
  650,
  1000
];

/**
 *findeRule(letterSelected,aqlSelected)
 *
 * @param {*} letterSelected
 * @param {*} aqlSelected
 * @returns
 */
function findRule(letterSelected, aqlSelected) {
  console.log("Executing findRule()");
  console.log("Buscando aql: ", aqlSelected);
  console.log("Buscando letra: ", letterSelected);

  let rulefound = { acceptanceNumber: -1, rejectionNumber: -1 };
  if (letterSelected !== null && aqlSelected !== null) {
    NormalInspectionTable.forEach(el => {
      //      console.log("---------------")
      //    console.log("Recorrido tabla",el)
      //  console.log("aql include",el.aql === aqlSelected)
      //console.log("letra include",el.letters.includes(letterSelected))
      //console.log("---------------")

      if (el.aql === aqlSelected && el.letters.includes(letterSelected)) {
        console.log("Regla encontrada", el.rules);
        rulefound = el.rules;
      }
    });
  }
  return rulefound;
}

export { findRule, listAql };
