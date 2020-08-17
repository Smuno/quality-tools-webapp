<template>
  <div>
    <b-container>
      <b-row>
        <b-col cols="4"><table-container v-model="tableData"/></b-col>
        <b-col><graph-pareto :plotData="plotData" /> </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import TableContainer from "../components/Pareto/TableContainer";
import GraphPareto from "../components/Pareto/GraphPareto";

export default {
  name: "Pareto",
  components: {
    TableContainer,
    GraphPareto
  },
  data() {
    return {
      //para v-model TableContainer - comienza con ejemplo
      tableData: [
        { id: 1, name: "Cables rotos", value: 22 },
        { id: 2, name: "Sin materiales", value: 10 }
      ]
    };
  },
  methods: {},
  computed: {
    //calculo de los datos para plot con depencencia de los datos de tabla
    plotData: function() {
      //entregar ordenado de menor a mayor
      let sorted = [...this.tableData].sort((a, b) => {
        return parseInt(a.value) - parseInt(b.value);
      });
      /*calcular porcentajes - line*/
      //Suma de todos los valores
      const totalValue = [...sorted].reduce((a, b) => {
        return parseInt(a) + parseInt(b.value);
      }, 0);
      //Calculo de valores acumulados de menor a mayor
      sorted.reverse();
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
      
      //porcentajes.reverse();
      return {
        xNames: sorted.map(el => {
          return el.name;
        }),
        yBar: sorted.map(el => {
          return parseInt(el.value);
        }),
        yLine: porcentajes
      };
    }
  }
};
</script>
