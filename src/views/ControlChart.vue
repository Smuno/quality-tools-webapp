<template>
  <b-container fluid>
    <b-navbar variant="info" type="dark" :sticky="true">
      <b-button @click="newRow" size="sm">Add Row</b-button>
      <b-button @click="deleteRow" variant="danger" size="sm"
        >Delete Row</b-button
      >
      <b-button variant="warning" size="sm">Delete Selected Row</b-button>
      <b-col cols="4">
        <b-form-select
          v-model="chartType"
          :options="[
            { value: null, text: 'Select Chart Type' },
            { value: 'XR', text: 'Chart X-R Ranges' },
            { value: 'XS', text: 'Chart X-S Standar Deviation' }
          ]"
        ></b-form-select>
      </b-col>
    </b-navbar>
    <b-row>
      <b-col cols="4">
        <table-tabulator v-model="tableData" :options="tableOptions" />
        <TextAreaData2JSON @pasted-data="EVENTtextArea($event)" />
      </b-col>
      <b-col>
        <b-row>
          <PlotlyGraph
            ref="ProcessAverage"
            :plotData="plotData.average"
            :layout="plotlyLayout.average"
          />
        </b-row>
        <b-row>
          <PlotlyGraph
            ref="ProcessVariability"
            :plotData="plotData.variability"
            :layout="plotlyLayout.variability"
          />
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import TableTabulator from "../components/Generics/TableTabulator";
import TextAreaData2JSON from "../components/Generics/TextAreaData2JSON";
import PlotlyGraph from "../components/Generics/PlotyGraph";
import {
  DEFAULT_LAYOUT,
  DEFAULT_TABLE,
  DEFAULT_OPTION_TABLE
} from "../components/ControlChart/ControlChartConfig";
import { factorsControlCharts } from "../components/ControlChart/FactorsControlCharts";

import { create, all } from "mathjs";

const math = create(all);

export default {
  name: "ControlChart",
  components: {
    TableTabulator,
    TextAreaData2JSON,
    PlotlyGraph
  },
  data() {
    return {
      /**Para v-model TableContainer - comienza con ejemplo*/
      tableData: DEFAULT_TABLE,
      /** Options to tabulator */
      tableOptions: DEFAULT_OPTION_TABLE,
      /** Layout to plotly */
      plotlyLayout: DEFAULT_LAYOUT,
      chartType: "XR"
    };
  },
  methods: {
    //crear evento para añadir columnas
    newRow: function() {
      this.tableData.push({});
    },
    deleteRow: function() {
      this.tableData.pop();
    },
    // TODO borrar filas seleccionadas
    deleteSelectedRows: function() {},
    EVENTtextArea: function(eventData) {
      /**
       * Ante llegada de datos copiados de excel (textareadata2json)
       */
      eventData.forEach((el, index) => {
        eventData[index].id = "S" + index;
      });

      //crear nueva definicion de columnas y setear
      const columnsNames = Object.keys(eventData[0]);
      let newColumns = [];

      columnsNames.forEach((el, index) => {
        newColumns.push({ field: el, title: el, editor: true });
      });
      newColumns.unshift(newColumns.pop());
      this.tableOptions.columns = newColumns;
      //setear nuevos datos (eventData) a tableData
      this.tableData = eventData;
    },
    CALLBACKrowSelected: function(data, rows) {
      // console.log("data: ", data);
      // console.log("rows: ", rows);
    }
  },
  computed: {
    plotData: function() {
      //$ Tamaño muestral - Solo se considera caso de tamaño muestral igual

      const idRows = [...this.tableData].map(rowObj => {
        return rowObj.id;
      });
      const dataAsArray = [...this.tableData].map(rowObj => {
        const rowValues = Object.values(rowObj);
        rowValues.pop();
        return rowValues.map(el => {
          return parseFloat(el);
        });
      });
      const sampleSize = dataAsArray[0].length;

      //* meanRows es array de floats de promedios x̄
      const meanRows = dataAsArray.map(el => {
        return (
          el.reduce((acc, current) => {
            return acc + parseFloat(current);
          }, 0) / sampleSize
        );
      });

      //* meanAllRows es float de ̿x
      const meanAllRows =
        meanRows.reduce((acc, current) => {
          return acc + current;
        }) / meanRows.length;

      const range_RChart = dataAsArray.map(el => {
        return math.max(el) - math.min(el);
      });

      const range_average_RChart = math.mean(range_RChart);

      const variance_SChart = dataAsArray.map((row, index) => {
        return ((
          row.reduce((acc, current) => {
            return acc + (current - meanRows[index]) ** 2;
          }, 0) /
          (sampleSize - 1)
        )**(1/2));
      })

      const variance_average_SChart=math.mean(variance_SChart)

      const desviation={
        XR:range_RChart,
        XS:variance_SChart
      }
      const average_desviation ={
        XR:range_average_RChart,
        XS:variance_average_SChart
      }

      //!   Falta considerar caso n=1
      /*   Para carta de promedios todos tiene la forma
       *    Center Line = ̿x (promedio de promedios)
       *    UCL (LCL)=  ̿x ± distance * desviation
       *    distance puede ser A2 (para x-R) o A3 (para x-s)
       */
      /*   Para carta de desviacion todos tienen la forma
       *    Center Line = meanDeviation (promedio de desviaciones)
       *    UCL (LCL) = distance * meanDeviation
       *    D4 y D3 para UCL y LCL (para x-R)
       *    B4 y B3 para UCL y LCL (para x-s)
       */
      //TODO  Cases for samplesize n=1 and n>25
      //Bordes del grafico
      const xBordes = [-1, dataAsArray.length + 1];
      //Factores para graficos
      const factors = factorsControlCharts(sampleSize);

      console.log('deviation for this chart',average_desviation[this.chartType])
      // Formar linea average plot proceso
      const averageProcess = {
        name: "Characteristic",
        type: "scatter",
        y: meanRows,
        text: idRows,
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
      //Formar linea average plot central
      const averageCenterLine = {
        x: xBordes,
        y: [meanAllRows, meanAllRows],
        name: "Average Process",
        type: "scatter",
        mode: "lines",
        line: {
          color: "#545E63",
          width: 2
        }
      };
      //Formar linea average plot UCL y LCL
      const averageUCL = {
        x: xBordes,
        y: [
          meanAllRows + factors[this.chartType].fProcess * average_desviation[this.chartType],
          meanAllRows + factors[this.chartType].fProcess * average_desviation[this.chartType]
        ],
        name: "UCL",
        type: "scatter",
        mode: "lines",
        line: {
          color: "#e9c46a",
          width: 2,
          dash: "dash"
        }
      };

      console.log("factor: ");

      const averageLCL = {
        x: xBordes,
        y: [
          meanAllRows - factors[this.chartType].fProcess * average_desviation[this.chartType],
          meanAllRows - factors[this.chartType].fProcess * average_desviation[this.chartType]
        ],
        name: "LCL",
        type: "scatter",
        mode: "lines",
        line: {
          color: "#e9c46a",
          width: 2,
          dash: "dash"
        }
      };
      //
      //Formar linea variability plot proceso
      const variabilityProcess = {
        name: "Variability Process",
        type: "scatter",
        y: desviation[this.chartType],
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
      //
      //Formar linea variability plot central
      const variabilityCenterLine = {
        x: xBordes,
        y: [average_desviation[this.chartType], average_desviation[this.chartType]],
        name: "Average Range",
        type: "scatter",
        mode: "lines",
        line: {
          color: "#545E63",
          width: 2
        }
      };
      // Formar linea variability plot UCL y LCL
      const variabilityUCL = {
        x: xBordes,
        y: [
          factors[this.chartType].fUCL * average_desviation[this.chartType],
          factors[this.chartType].fUCL * average_desviation[this.chartType]
        ],
        name: "UCL",
        type: "scatter",
        mode: "lines",
        line: {
          color: "#e9c46a",
          width: 2,
          dash: "dash"
        }
      };
      const variabilityLCL = {
        x: xBordes,
        y: [
          factors[this.chartType].fLCL * average_desviation[this.chartType],
          factors[this.chartType].fLCL * average_desviation[this.chartType]
        ],
        name: "UCL",
        type: "scatter",
        mode: "lines",
        line: {
          color: "#e9c46a",
          width: 2,
          dash: "dash"
        }
      };
      return {
        average: [averageProcess, averageCenterLine, averageUCL, averageLCL],
        variability: [
          variabilityProcess,
          variabilityCenterLine,
          variabilityUCL,
          variabilityLCL
        ]
      };
    }
  },
  watch: {},
  mounted() {
    this.tableOptions.rowSelected = this.CALLBACKrowSelected;
  }
};
</script>
