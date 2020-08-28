<template>
  <b-container>
    <b-row>
      <b-col cols="5">
        <b-navbar variant="info" type="dark" :sticky="true">
          <b-button v-on:click="addRow" variant="success" size="sm">
            New Row
          </b-button>
          <b-button v-on:click="deleteRow" variant="danger" size="sm">
            Delete Last Row
          </b-button>
        </b-navbar>
        <table-tabulator v-model="tableData" :options="tableOptions" />
        <TextAreaData2JSON @pasted-data="EVENTtextArea($event)" />
      </b-col>
      <b-col>
        <ploty-graph :plotData="plotData" :layout="plotlyLayout" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import TableTabulator from "../components/Generics/TableTabulator";
import PlotyGraph from "../components/Generics/PlotyGraph";
import TextAreaData2JSON from "../components/Generics/TextAreaData2JSON";
import {
  DEFAULT_LAYOUT,
  DEFAULT_TABLE,
  DEFAULT_OPTION_TABLE
} from "../components/Pareto/ParetoConfig";

export default {
  name: "Pareto",
  components: {
    TableTabulator,
    PlotyGraph,
    TextAreaData2JSON
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
    addRow: function() {
      /** Se añade nueva columna */
      this.tableData.push({});
    },
    deleteRow: function() {
      /** Se elimina ultima columna
       * (falta dar habilidad de eligir cual eliminar)
       */
      this.tableData.pop();
    },
    EVENTtextArea: function(eventData) {
      //A la llegada de datos copiados de excel
      this.tableData = eventData;
    }
  },
  computed: {
    //calculo de los datos para plot con depencencia de los datos de tabla
    // x0: Name / x2:value
    plotData: function() {
      //entregar ordenado de mayor a menor
      let sorted = [...this.tableData].sort((a, b) => {
        return parseInt(b.x1) - parseInt(a.x1);
      });
      /*calcular porcentajes - line*/
      //Suma de todos los valores
      const totalValue = [...sorted].reduce((a, b) => {
        return parseInt(a) + parseInt(b.x1);
      }, 0);
      //Calculo de valores acumulados de menor a mayor
      let porcentajes = [...sorted].reduce(
        (a, b) => {
          return a.concat(parseInt(a.slice(-1)) + parseInt(b.x1));
        },
        [0]
      );
      //Se elimina el primer valor (cero)
      porcentajes.shift();
      //Calculo del porcentaje de los acumulados con respecto a la suma total
      porcentajes = porcentajes.map(el => {
        return 100 * (el / totalValue);
      });
      //Calculando los mayores en el 80%
      let top80 = porcentajes.map((porcent, index) => {
        if ((porcent > 80 && index == 0) || porcent <= 80)
          return parseInt(porcent);
      });
      //Entregar datos listos
      const xNames = sorted.map(el => {
        return el.x0;
      });
      const yBar = sorted.map(el => {
        return parseInt(el.x1);
      });
      const yLine = porcentajes;
      /* Seteo de datos para plotear */
      const bar = {
        x: xNames,
        y: yBar,
        name: "Problemas",
        type: "bar"
      };
      const topbar = {
        x: xNames,
        y: top80,
        mode: "markers",
        name: "Top 80%",
        type: "scatter",
        yaxis: "y2",
        marker: {
          color: "rgb(219, 64, 82)",
          size: 12
        }
      };
      const line = {
        x: xNames,
        y: yLine,
        name: "%",
        type: "line",
        yaxis: "y2"
      };
      return [bar, line, topbar];
    }
  }
};
</script>
