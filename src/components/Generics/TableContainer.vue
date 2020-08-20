<template>
  <b-container id="table">
    <TabulatorComponent
      v-model="userTable"
      v-on:row-added="userTable"
      ref="tabulator"
      :options="options"
      :integration="{ updateStrategy: 'REPLACE' }"
    />
    <b-container fluid>
      <b-row>
        <b-col>
          <b-button v-on:click="addRow" variant="success" size="sm">
            New Row
          </b-button>
          <b-button v-on:click="deleteRow" variant="danger" size="sm">
            Delete Row
          </b-button>
        </b-col>
        <b-col>
          <b-form-textarea
            ref="pasteArea"
            v-model="pastedText"
            rows="3"
            placeholder="Paste Excel Data Here"
            no-resize
          >
          </b-form-textarea>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
import { TabulatorComponent } from "vue-tabulator";
import { DEFAULT_OPTION_TABLE } from '../ControlChart/ControlChartConfig';

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
    return {
      pastedText: ""
    };
  },
  methods: {
    addRow: function() {
      /** Se añade nueva columna */
      this.userTable.push(DEFAULT_OPTION_TABLE.emptyColumn);
    },
    deleteRow: function() {
      /** Se elimina ultima columna
       * (falta dar habilidad de eligir cual eliminar)
       */
      this.userTable.pop();
    },
    textToJson: function(tsvText) {
      /**
     * Convert copy data from excel spreadsheet to json table data
     */
      var allTextLines = tsvText.split(/\r\n|\n/);
      var headers = this.options.columns.map(el => {
        return el.field;
      });
      var lines = [];
      for (var i = 0; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(/\t|,/);
        if (data.length == headers.length) {
          var row = {};
          for (var j = 0; j < headers.length; j++) {
            row[headers[j]] = data[j];
          }
          lines.push(row);
        }
      }
      return lines;
    }
  },
  mounted() {},
  watch: {
    userTable: function(newVal) {
      this.$emit("changeOnTable", newVal);
    },
    pastedText: function(newVal) {
      if (newVal.length > 0) {
        this.userTable = [...this.textToJson(newVal)];
      }
      this.$refs.pasteArea.blur();
      setTimeout(() => {
        this.pastedText = "";
      }, 1);
    }
  }
};
</script>
