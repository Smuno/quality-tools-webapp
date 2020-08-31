<template>
  <b-container fluid>
    <b-col>
      <b-navbar variant="info" type="dark" :sticky="true">
        <b-button v-on:click="addRow" variant="success" size="sm">
          New Row
        </b-button>
        <b-button v-on:click="deleteRow" variant="danger" size="sm">
          Delete Last Row
        </b-button>
      </b-navbar>
      <TableTabulator v-model="middTableData" :options="tableOptions" />
      <TextAreaData2JSON @pasted-data="EVENTtextArea($event)" />
    </b-col>
  </b-container>
</template>

<script>
// cambiar layout - no ajusta a pagina
//* Eliminando filas se arreglan columnas
// TODO seleccion multiple de filas
//! BUG: NO SE PUEDE AÑADIR MAS DE UNA FILA
/* Bug no ocurre si se modifica la ultima fila antes de añadir
una nueva fila
  bug no ocurre en pareto, solo en control chart
  ? ¿es por el control de columnas options.columns columnAssing() ?
*/


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
import _ from 'lodash'

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
      // let lastrow= _.cloneDeep(  this.middTableData[this.middTableData.length-1])
      // lastrow.id=this.middTableData.length
      // this.middTableData.push(lastrow);
      this.middTableData.push({})
    },
    deleteRow: function() {
      /** Se elimina ultima columna*/
      console.log('delete row')
      this.middTableData.pop();
    },
    EVENTtextArea: function(copiedTableFromUser) {
      copiedTableFromUser.forEach((el, index) => {
        copiedTableFromUser[index].id = index;
      });
      this.middTableData = copiedTableFromUser;
    },
  },
  mounted() {
    this.middTableData = _.cloneDeep(this.tableData)
  },
  watch: {
    middTableData: {
      handler: function() {
        this.$emit("table-data-ready", this.middTableData);
      },
      deep: true
    }
  }
};
</script>
