<template>
  <div>
    <b-container>
      <b-row>
        <b-col cols="5">
          <table-container v-model="tableData" :options="tableOptions" />
        </b-col>
        <b-col>
          <ploty-graph :plotData="plotData" :layout="plotlyLayout" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import TableContainer from "../components/Generics/TableContainer";
import PlotyGraph from "../components/Generics/PlotyGraph";
import {
  DEFAULT_LAYOUT,
  DEFAULT_TABLE,
  DEFAULT_OPTION_TABLE
} from "../components/ControlChart/ControlChartConfig";

import { create, all } from "mathjs";

const math = create(all);

export default {
  name: "ControlChart",
  components: {
    TableContainer,
    PlotyGraph
  },
  data() {
    return {
      /**Para v-model TableContainer - comienza con ejemplo*/
      tableData: DEFAULT_TABLE,
      /** Options to tabulator */
      tableOptions: DEFAULT_OPTION_TABLE,
      /** Layout to plotly */
      plotlyLayout: DEFAULT_LAYOUT
    };
  },
  methods: {
    
  },
  computed: {
    //calculo de los datos para plot con depencencia de los datos de tabla
    plotData: function() {
      const yLine = this.tableData.map(el => {
        return parseFloat(el.value);
      });
      const comments = this.tableData.map(el => {
        return el.name;
      });

      const mean = math.mean(yLine);
      const standardDeviation = math.std(yLine);
      const xBordes = [-2, yLine.length];

      const xViolation = [];
      const yViolation = [];

      yLine.forEach((value, index) => {
        if (value > 3 * standardDeviation + mean) {
          xViolation.push(index);
          yViolation.push(value);
        }
      });

      const characteristicLine = {
        name: "Characteristic",
        type: "scatter",
        y: yLine,
        text: comments,
        textposition: "top",
        mode: "lines+markers",
        line: {
          color: "#016fb9",
          width: 2
        },
        marker: {
          color: "#016fb9",
          size: 8,
          symbol: "circle"
        }
      };
      const meanLine = {
        x: xBordes,
        y: [mean, mean],
        name: "Mean",
        type: "scatter",
        mode: "lines",
        line: {
          color: "#545E63",
          width: 2
        }
      };
      const upOneDeviation = {
        x: xBordes,
        y: [standardDeviation + mean, standardDeviation + mean],
        name: "1σ",
        type: "scatter",
        mode: "lines",
        line: {
          color: "#e9c46a",
          width: 2,
          dash: "dash"
        }
      };
      const upTwoDeviation = {
        x: xBordes,
        y: [2 * standardDeviation + mean, 2 * standardDeviation + mean],
        name: "2σ",
        type: "scatter",
        mode: "lines",
        line: {
          color: "#f4a261",
          width: 2,
          dash: "dash"
        }
      };
      const upThreeDeviation = {
        x: xBordes,
        y: [3 * standardDeviation + mean, 3 * standardDeviation + mean],
        name: "3σ",
        type: "scatter",
        mode: "lines",
        line: {
          color: "#e76f51",
          width: 2,
          dash: "dash"
        }
      };

      const violationMarker = {
        x: xViolation,
        y: yViolation,
        name: "Violations",
        mode: "markers",
        type: "scatter",
        marker: {
          color: "#CC2936",
          size: 14,
          symbol: "diamond"
        }
      };

      return [
        meanLine,
        upThreeDeviation,
        upTwoDeviation,
        upOneDeviation,
        characteristicLine,
        violationMarker
      ];
    }
  },
  mounted() {}
};
</script>
