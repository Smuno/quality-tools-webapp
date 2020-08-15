<template>
  <b-container id="table">
    <b-button v-on:click="addRow" variant="success">Nueva Fila</b-button>
    <TabulatorComponent
      v-model="data"
      :options="options"
      :integration="{ updateStrategy: 'REPLACE' }"
    />
  </b-container>
</template>

<script>
import { testData } from "./testData";
import { TabulatorComponent } from "vue-tabulator";

export default {
  name: "TableContainer",
  components: {
    TabulatorComponent
  },
  data() {
    return {
      data: [
        {
          id: 1,
          name: "Cables rotos",
          value: 22
        }
      ],
      options: {
        clipboard: true,
        layoutColumnsOnNewData: true,
        layout: "fitColumns",
        height: "400px",
        columns: [
          { field: "id", title: "ID", visible: false },
          { field: "name", title: "Name", editor: true, widthGrow: 2 },
          { field: "value", title: "Value", editor: true, hozAlign: "center" }
        ]
      }
    };
  },
  methods: {
    addRow: function() {
      this.data.push({
        id: this.data.length + 1,
        name: "",
        location: "",
        gender: "",
        rating: 0
      });
    }
  },
  mounted() {},
  watch: {}
};
</script>
