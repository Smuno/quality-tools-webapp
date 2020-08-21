<template>
  <b-form-textarea
    ref="pasteArea"
    v-model="pastedText"
    rows="3"
    placeholder="Paste Excel Data Here"
    no-resize
  >
  </b-form-textarea>
</template>

<script>
/** 
*Transforma datos pegados desde excel hacia JSON
*/

//Evento pasted-data
export default {
  name: "TextAreaData2JSON",
  props: {
    namedHeaders: Array
  },
  data() {
    return {
      pastedText: ""
    };
  },
  methods: {
    textToJson: function(tsvText) {
      var allTextLines = tsvText.split(/\r\n|\n/);
      //Split per line on tabs and commas
      var headers = allTextLines[0].split(/\t|,/);
      headers=headers.map((el,index)=>{
        return'x'+index
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
  watch: {
    pastedText: function(newVal) {
      if (newVal.length > 0) {
        this.$emit('pasted-data',this.textToJson(newVal))
      }
      setTimeout(() => {
        this.$refs.pasteArea.blur();
        this.pastedText = "";
      }, 1);
    }
  }
};
</script>
