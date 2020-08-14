<template>
    <b-container fluid id="table">
        <b-button v-on:click="addRow" variant="success">Nueva Fila</b-button>
        <TabulatorComponent v-model="dataTable" :options="options" />
    </b-container>
</template>

<script>
import {testData} from './testData'
import { TabulatorComponent } from "vue-tabulator";

export default {
  name: "TableContainer",
  components: {
    TabulatorComponent
  },
  data() {
    return {
      dataTable:testData,
      options:{
        autoColumns:true,
      }
    };
  },
  methods: {
    addRow:function(){
      this.dataTable.push({})
    }
  },
  mounted() {
    
  },
  watch:{
    
  }
};
</script>
