<template>
  <div>
    <b-container>
      <b-row>
        <b-col><table-container v-model="tableData"/></b-col>
        <b-col><graph-pareto :plotData="table2plotData" /> </b-col>
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
      //para v-model TableContainer
      tableData: [
        { id: 1, name: "Cables rotos", value: 22 },
        { id: 1, name: "teclados", value: 10 },
        { id: 1, name: "tijeras malas", value: 34 }
      ]
    };
  },
  methods: {},
  computed: {
    table2plotData: function() {
      //entregar ordenado
      let sorted = [...this.tableData].sort((a, b) => {
        return (parseInt(a.value) - parseInt(b.value));
      });
      /*calcular porcentajes - line*/
      const totalValue=[...sorted].reduce((a,b)=>{
        return (parseInt(a)+parseInt(b.value))
      },0)

      let porcentajes=[...sorted].reduce((a,b)=>{
        return a.concat(parseInt(a.slice(-1))+ parseInt(b.value))
      },[0])
      porcentajes.shift()
      porcentajes=porcentajes.map((el)=>{
        return (100*(el/totalValue))
      })
      sorted.reverse()
      porcentajes.reverse()
      return {
        xNames: sorted.map(el => {
          return el.name;
        }),
        yBar: sorted.map(el => {
          return parseInt(el.value);
        }),
        yLine:porcentajes
      };
    }
  }
};
</script>
