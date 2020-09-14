const normalInspectionTable = [
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

const tightenedInspectionTable = [];

const reducedInspectionTable = [];

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
 * @typedef {Object} Rules 
 * @property {Number} acceptanceNumber -Acceptance sample rule
 * @property {Number} rejectionNumber -Rejection sample rule
*/

/**
 *  Find the rule of acceptance & rejection for
 * normal inspection (II)
 * @param {String} rowLetter
 * @param {Number} aqlSelected
 * Acceptance Quality Limit
 * @returns {Rules} the rules for the lot
 */

function findRule(rowLetter, aqlSelected) {
  let rulefound = { acceptanceNumber: -1, rejectionNumber: -1 };
  if (rowLetter !== null && aqlSelected !== null) {
    normalInspectionTable.forEach(el => {
      if (el.aql === aqlSelected && el.letters.includes(rowLetter)) {
        rulefound = el.rules;
      }
    });
  }
  return rulefound;
}

export { findRule, listAql };
