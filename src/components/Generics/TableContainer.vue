<template>
  <b-container id="table">
    <TabulatorComponent 
      v-model="userTable"
      v-on:row-added="userTable"
      ref="tabulator"
      :options="options"
      :integration="{ updateStrategy: 'REPLACE' }"
    />
    <b-form-textarea
      ref="pasteArea"
      v-model="pastedText"
      size="sm"
      placeholder="Paste Excel Data Here"
    >
    </b-form-textarea>
  </b-container>
</template>

<script>
import { TabulatorComponent } from "vue-tabulator";

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

    /** 
     * Convert copy data from excel spreadsheet to json table data
    */
    textToJson: function(tsvText) {
      var allTextLines = tsvText.split(/\r\n|\n/);
      var headers = this.options.columns.map((el)=>{
        return el.field
      })
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
      this.$emit("changeOnTable", newVal)
    },
    pastedText: function(newVal) {
      if (newVal.length > 0) {
        this.userTable=[...this.textToJson(newVal)];
      }
      this.$refs.pasteArea.blur();
      setTimeout(() => {
        this.pastedText = "";
      }, 1);
    }
  }
};
</script>
