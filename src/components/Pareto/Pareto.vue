<template>
  <b-container>
    <b-row>
      <b-col cols="5">
        <FullTableEditorVertical
          v-model="tableData"
          :tableOptions="tableOptions"
        />
      </b-col>
      <b-col>
        <ploty-graph :plotData="plotData" :layout="plotlyLayout" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import FullTableEditorVertical from "@/components/Generics/FullTableEditorVertical";
import PlotyGraph from "@/components/Generics/PlotyGraph";
import {
  DEFAULT_LAYOUT,
  DEFAULT_TABLE,
  DEFAULT_OPTION_TABLE
} from "@/components/Pareto/ParetoConfig";
import _ from "lodash";

export default {
  name: "Pareto",
  components: {
    PlotyGraph,
    FullTableEditorVertical
  },
  props: {
    /** 
     * Unique id to identify the instance of the tool
    */
    uniqueId: {
      type: String,
      default: "123FFF"
    }
  },
  data() {
    return {
      /**Para v-model TableContainer - comienza con ejemplo*/
      tableData: DEFAULT_TABLE,
      /** Options to tabulator */
      tableOptions: DEFAULT_OPTION_TABLE,
      /** Layout to plotly */
      plotlyLayout: DEFAULT_LAYOUT,
      /**
       * @params {array} id of rows that are the first top 80%
       */
      idTop80: [0]
    };
  },
  methods: {},
  computed: {
     /** 
       * Computed Property
       * @returns {Array} set of objects to be use by plotly.js (plotlygraph.vue)
      */
    plotData: function() {
      //calculo de los datos para plot con depencencia de los datos de tabla
      // x0: Name / x2:value
      //entregar ordenado de mayor a menor
      let sorted = _.cloneDeep(this.tableData).sort((a, b) => {
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
      let top80 = porcentajes.filter((porcent, index) => {
        if ((porcent > 80 && index == 0) || porcent <= 80)
          return parseInt(porcent);
      });
      //Entregar datos listos
      const xNames = sorted.map(el => {
        return el.x0;
      });

      //*Obtencion de id para usos futuros
      const xId = sorted.map(el => {
        return el.id;
      });
      const xNames_top80 = xNames.slice(
        0,
        top80.length > 0 ? top80.length - 1 : 0
      );
      const xId_top80 = xId.slice(0, top80.length > 0 ? top80.length  : 0);
      this.idTop80 = xId_top80;
      
      const yBar = sorted.map(el => {
        return parseInt(el.x1);
      });
      const yLine = porcentajes;
      /* Seteo de datos para plotear */
      /** 
       * @constant {Object} .Data of vertical bars to plotly 
      */
      const bar = {
        x: xNames,
        y: yBar,
        name: "Problemas",
        type: "bar"
      };

      /** 
       * @constant {Object} .Data of markers for the first 80%
      */
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

      /** 
       * @constant {Object} .Data of accumulative percentage 
      */
      const line = {
        x: xNames,
        y: yLine,
        name: "%",
        type: "line",
        yaxis: "y2"
      };
      return [bar, line, topbar];
    },
    result: function() {
      return {
        metadata: {
          toolName: "Pareto",
          id: this.uniqueId
        },
        data: this.tableData,
        header: {
          /** 
           * @type {Array} Set of tags (string) to be
           * display on result card
          */
          tags: []
        },
        body: {
          /** 
           * @type {}
          */
          idTableResult: this.idTop80,
          /** 
           * @type {Array}
           * set of Table elements (Object) of the top 80%
           * | x0 : descripcion
           * | x1 : value
           * | id : row id
          */
          top80TableResult:this.tableData.filter((row, index) => {
            if (this.idTop80.includes(row.id)) return row;
          })
        }
      };
    }
  },
  watch: {
    /** 
     * Watching change on result on any level
     * to emit event 'result-event'
    */
    result: {
      deep: true,
      handler: function (NewResult) {
        /** 
         * Event for ToolView
         * @property {Object} NewResult
         * New result data to be send to parent component (should be to TheToolView)
        */
        this.$emit('result-event',NewResult)
      }
    },
  },
  mounted() {}
};
</script>
