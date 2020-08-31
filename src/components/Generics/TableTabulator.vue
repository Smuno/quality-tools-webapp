<template>
  <div ref="tablePlace"></div>
</template>

<script>
import Tabulator from "tabulator-tables";

export default {
  name: "TableTabulator",
  model: {
    prop: "tableData",
    event: "changeOnTable"
  },
  data() {
    return {
      /** Donde se aloja instancia de Tabulator */
      table: null
    };
  },
  props: {
    /*
     * Contiene los datos recibidos para mostrar en tabla
     */
    tableData: Array,
    /** 
    Contiene las opciones para visualizar tabla tabulator
    */
    options: Object
  },
  methods: {
    rowUpdated: function(cell) {
      /**
       * Funcion Callback cuando ocurre cambio en celda (options.cellEdited(callback(cell)))
       */
      // Ante un cambio en la tabla se emite alerta con los datos hacia el padre
      this.$emit("changeOnTable", this.table.getData());
    }
  },
  mounted() {
    //Data debe encontrarse dentro de las opciones para tabulator
    this.options.data = this.tableData;
    //Se añade callback a cellEdited
    this.options.cellEdited = this.rowUpdated;
    this.table = new Tabulator(this.$refs.tablePlace, this.options);
  },
  watch: {
    tableData: {
      deep: true,
      handler: function(newValue) {
        this.table.replaceData(newValue);
      }
    },
    options: {
      deep: true,
      handler: function(newValue) {
        this.table.setColumns(newValue.columns);
      }
    }
  },
  computed: {}
};
</script>
