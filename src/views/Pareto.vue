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
      tableData: [{ id: 1, name: "Cables rotos", value: 22 }]
    };
  },
  methods: {},
  computed: {
    table2plotData: function() {
      return {
        xData: this.tableData.map(el => {
          return el.name;
        }),
        yData: this.tableData.map(el => {
          return parseInt(el.value);
        })
      };
    }
  }
};
</script>
