<template>
  <div>
    <b-container>
      <TableContainer />
    </b-container>
    <b-container></b-container>
  </div>
</template>

<script>
import TableContainer from "../components/Pareto/TableContainer";

export default {
  name: "Pareto",
  components: {
    TableContainer
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
