<template>
  <div>
    <b-container>
      <b-row>
        <b-col cols="4">
          <table-container v-model="tableData" :options="tableOptions" />
        </b-col>
        <b-col>
          <graph-pareto :plotData="plotData" :layout="graphLayout" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import TableContainer from "../components/Pareto/TableContainer";
import GraphPareto from "../components/Pareto/GraphPareto";
import {
  DEFAULT_LAYOUT,
  DEFAULT_TABLE,
  DEFAULT_OPTION_TABLE
} from "../components/Pareto/ParetoConfig";

export default {
  name: "Pareto",
  components: {
    TableContainer,
    GraphPareto
  },
  data() {
    return {
      //para v-model TableContainer - comienza con ejemplo
      tableData: DEFAULT_TABLE,
      tableOptions: DEFAULT_OPTION_TABLE,
      graphLayout: DEFAULT_LAYOUT
    };
  },
  methods: {},
  computed: {
    //calculo de los datos para plot con depencencia de los datos de tabla
    plotData: function() {
      //entregar ordenado de mayor a menor
      let sorted = [...this.tableData].sort((a, b) => {
        return parseInt(b.value) - parseInt(a.value);
      });
      /*calcular porcentajes - line*/
      //Suma de todos los valores
      const totalValue = [...sorted].reduce((a, b) => {
        return parseInt(a) + parseInt(b.value);
      }, 0);
      //Calculo de valores acumulados de menor a mayor
      let porcentajes = [...sorted].reduce(
        (a, b) => {
          return a.concat(parseInt(a.slice(-1)) + parseInt(b.value));
        },
        [0]
      );
      //Se elimina el primer valor (cero)
      porcentajes.shift();
      //Calculo del porcentaje de los acumulados con respecto a la suma total
      porcentajes = porcentajes.map(el => {
        return 100 * (el / totalValue);
      });
      //Se dan vuelta para dejar de mayor a menor
      let top80 = [];

      porcentajes.forEach((porcent, index) => {
        if (porcent <= 80) {

          top80.push(parseInt(porcent));
        }
      });

      console.log(top80);
      //porcentajes.reverse();
      return {
        xNames: sorted.map(el => {
          return el.name;
        }),
        yBar: sorted.map(el => {
          return parseInt(el.value);
        }),
        yLine: porcentajes,
        ytopBar: top80
      };
    }
  }
};
</script>
