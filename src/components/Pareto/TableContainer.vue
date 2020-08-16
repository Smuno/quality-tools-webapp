<template>
  <b-container id="table">
    <b-button v-on:click="addRow" variant="success">Nueva Fila</b-button>
    <TabulatorComponent
      v-model="userTable"
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
  model:{
    prop:'userTable',
    event:'changeOnTable'
  },
  props:{
    userTable:Array,
  },
  data() {
    return {
      options: {
        clipboard: true,
        layoutColumnsOnNewData: true,
        layout: "fitColumns",
        height: "400px",
        columns: [
          { field: "id", title: "ID", visible: false },
          { field: "name", title: "Name", editor: true, widthGrow: 2 },
          { field: "value", title: "Value", editor: true, hozAlign: "center",}
        ]
      }
    };
  },
  methods: {
    addRow: function() {
      this.userTable.push({
        id: this.userTable.length + 1,
        name: "",
        value:''
      });
    }
  },
  mounted() {},
  watch: {
    userTable:function(newVal){
      this.$emit('changeOnTable',newVal)
    }
  }
};
</script>
