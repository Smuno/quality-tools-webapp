<template>
  <b-container id="table">
    <b-button v-on:click="addRow" variant="success" size="sm">
      Nueva Fila
    </b-button>
    <TabulatorComponent
      v-model="userTable"
      ref="tabulator"
      :options="options"
      :integration="{ updateStrategy: 'REPLACE' }"
    />
    <b-button v-on:click="deleteRow" variant="danger" size="sm">
      Borrar Ultima Fila
    </b-button>
  </b-container>
</template>

<script>
import { TabulatorComponent } from "vue-tabulator";

export default {
  name: "TableContainer",
  components: {
    TabulatorComponent
  },
  model: {
    prop: "userTable",
    event: "changeOnTable"
  },
  props: {
    userTable: Array,
    options: Object
  },
  data() {
    return {};
  },
  methods: {
    addRow: function() {
      this.userTable.push({
        id: this.userTable.length + 1,
        name: "",
        value: "0"
      });
    },
    deleteRow: function() {
      this.userTable.pop();
    }
  },
  mounted() {},
  watch: {
    userTable: function(newVal) {
      this.$emit("changeOnTable", newVal);
    }
  }
};
</script>
