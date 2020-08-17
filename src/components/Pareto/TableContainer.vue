<template>
  <b-container id="table">
    <b-button v-on:click="addRow" variant="success" size="sm">Nueva Fila</b-button>
    <b-button v-on:click="deleteRow" variant="danger" size="sm">Borrar Ultima Fila</b-button>
    <TabulatorComponent
      v-model="userTable"
      ref="tabulator"
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
        selectable:true,
        columns: [
          { field: "id", title: "ID", visible: false },
          { field: "name", title: "Name", editor: true, widthGrow: 2 },
          { field: "value", title: "Value", editor: true, hozAlign: "center",}
        ],
      }
    };
  },
  methods: {
    addRow: function() {
      this.userTable.push({
        id: this.userTable.length + 1,
        name: "",
        value:'0'
      });
    },
    deleteRow:function(){
      this.userTable.pop()
    }
  },
  mounted() {
  },
  watch: {
    userTable:function(newVal){
      this.$emit('changeOnTable',newVal)
    }
  }
};
</script>
