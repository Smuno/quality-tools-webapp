<template>
  <b-container>
    <b-row>
      <b-col>
        <!-- <b-navbar variant="info" type="dark" :sticky="true">
            <b-form-input
              v-model="sampleSize"
              size="sm"
              type="number"
              class="mr-sm-2"
              placeholder="Tamaño muestral"
            ></b-form-input>
          </b-navbar> -->
        <b-navbar variant="info" type="dark" :sticky="true">
          <b-button @click="newRow" size="sm">Add Row</b-button>
          <b-button @click="deleteRow" variant="danger" size="sm"
            >Delete Row</b-button
          >
          <b-button variant="warning" size="sm">Delete Selected Row</b-button>
          <b-form-input></b-form-input>
        </b-navbar>
        <table-tabulator v-model="tableData" :options="tableOptions" />
        <TextAreaData2JSON @pasted-data="EVENTtextArea($event)" />
      </b-col>
      <b-col>
        <ploty-graph :plotData="plotData" :layout="plotlyLayout" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import TableTabulator from "../components/Generics/TableTabulator";
import TextAreaData2JSON from "../components/Generics/TextAreaData2JSON";
import PlotlyGraph from "../components/Generics/PlotyGraph";
import {
  DEFAULT_LAYOUT,
  DEFAULT_TABLE,
  DEFAULT_OPTION_TABLE
} from "../components/ControlChart/ControlChartConfig";

import { create, all } from "mathjs";

const math = create(all);

export default {
  name: "ControlChart",
  components: {
    TableTabulator,
    TextAreaData2JSON,
    PlotlyGraph
  },
  data() {
    return {
      /**Para v-model TableContainer - comienza con ejemplo*/
      tableData: DEFAULT_TABLE,
      /** Options to tabulator */
      tableOptions: DEFAULT_OPTION_TABLE,
      /** Layout to plotly */
      plotlyLayout: DEFAULT_LAYOUT
      /**
       * Tamaño de la muestra - para crear columnas
       */
    };
  },
  methods: {
    //crear evento para añadir columnas
    newRow: function() {
      this.tableData.push({});
    },
    deleteRow: function() {
      this.tableData.pop();
    },
    deleteSelectedRows: function() {},
    EVENTtextArea: function(eventData) {
      /**
       * Ante llegada de datos copiados de excel (textareadata2json)
       */
      eventData.forEach((el, index) => {
        eventData[index].id = "S" + index;
      });

      //crear nueva definicion de columnas y setear
      const columnsNames = Object.keys(eventData[0]);
      let newColumns = [];

      columnsNames.forEach((el, index) => {
        newColumns.push({ field: el, title: el, editor: true });
      });
      newColumns.unshift(newColumns.pop());
      this.tableOptions.columns = newColumns;
      //setear nuevos datos (eventData) a tableData
      this.tableData = eventData;
    },
    CALLBACKrowSelected: function(data, rows) {
      console.log("data: ", data);
      console.log("rows: ", rows);
    }
  },
  computed: {
    plotData: function() {
      //Elegir metodo segun tamaño muestral (tableData[0].length-1)
        //¿Entregar metodos aparte?
      //Calcular linea proceso
      //calcular linea central
      //calcular UCL y DCL
    }
  },
  watch: {},
  mounted() {
    console.log("adding callback");
    this.tableOptions.rowSelected = this.CALLBACKrowSelected;
  }
};
</script>
