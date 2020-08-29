<template>
  <b-container fluid>
    <b-col>
      <b-row no-gutters>
        <b-navbar variant="info" type="dark" :sticky="true">
          <b-button v-on:click="addRow" variant="success" size="sm">
            New Row
          </b-button>
          <b-button v-on:click="deleteRow" variant="danger" size="sm">
            Delete Last Row
          </b-button>
        </b-navbar>
      </b-row>
      <b-row no-gutters>
        <TableTabulator v-model="middTableData" :options="tableOptions" />
      </b-row>
      <TextAreaData2JSON @pasted-data="EVENTtextArea($event)" />
    </b-col>
  </b-container>
</template>

<script>
//! cambiar layout - no ajusta a pagina
/**
Entrada: opciones default de tabla, dataTable as v-model
Comportamiento: 
    desplegar tabla
    desplegar text area para datos copiados de excel
    mostrar datos copiados de excel en tabla
    añadir y borrar filas
output: dataTable as v-model
Motivocion: eliminar repeticion de update en graficos al manejarlo
todo en un solo componente

father to this component: tableData -> this component to table-tabulator: middTableData 
then in return middTableData --> tableData
emitir alerta al cambio en middtabledata para actualizar tableData ('table-data-ready)

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
      middTableData: [{}]
    };
  },
  methods: {
    addRow: function() {
      /** Se añade nueva columna */
      this.middTableData.push({});
    },
    deleteRow: function() {
      /** Se elimina ultima columna
       * (falta dar habilidad de eligir cual eliminar)
       */
      this.middTableData.pop();
    },
    EVENTtextArea: function(copiedTableFromUser) {
      this.middTableData = copiedTableFromUser;
    }
  },
  mounted() {
    this.middTableData = [...this.tableData];
  },
  watch: {
    middTableData: {
      handler: function(newTableData) {
        this.$emit("table-data-ready", newTableData);
      },
      deep: true
    }
  }
};
</script>
