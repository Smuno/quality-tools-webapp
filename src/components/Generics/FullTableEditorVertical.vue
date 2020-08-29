<template>
  <b-container>
    <b-row>
      <b-button></b-button>
      <b-button></b-button>
    </b-row>
    <b-row>
      <TableTabulator v-model="tableData" :options="tableOptions" />
    </b-row>
    <TextAreaData2JSON @pasted-data="EVENTtextArea($event)" />
  </b-container>
</template>

<script>
/**
Entrada: opciones default de tabla, dataTable as v-model
Comportamiento: 
    desplegar tabla
    desplegar text area para datos copiados de excel
    mostrar datos copiados de excel en tabla
    añadir y borrar filas
output: dataTable as v-model
Motivo: eliminar repeticion de update en graficos al manejarlo
todo en un solo componente
*/
//? ¿separar tableData de la data v-model usada con la tabla?
import TextAreaData2JSON from "./TextAreaData2JSON";
import TableTabulator from "./TableTabulator";

export default {
  name: "FullTableEditorVertical",
  components: {
    TextAreaData2JSON,
    TableTabulator
  },
  model: {
    prop: "tableData",
    event: "table-data-ready"
  },
  props: {
    tableData: {
      type: Array
    },
    tableOptions: {
      type: Object
    }
  },
  data() {
    return {

    };
  },
  methods: {
    EVENTtextArea: function(copiedTableFromUser) {
      this.tableData = copiedTableFromUser;
    }
  }
};
</script>
