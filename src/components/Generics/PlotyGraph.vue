<template>
  <b-container>
    <div ref="tester"></div>
  </b-container>
</template>

<script>
import Plotly from "plotly.js-dist";

/** 
 * Simple Plotly Wrapper 
 * @displayName 
 */
export default {
  name: "PlotyGraph",
  data() {
    return {
      /** 
       * Contiene instancia plotly al montar mounted()
      */
      thePlot: null
    };
  },
  props: {
    /** 
     * Data a presentar (multiArray)
    */
    plotData: {
      type: Array,
      required: true
    },
    /** 
     * Layout del grafico
     * Objeto
    */
    layout: Object
  },
  methods: {

  },
  mounted() {
    this.thePlot = Plotly.newPlot(
      this.$refs.tester,
      this.plotData,
      this.layout,
      { responsive: true }
    );
  },
  computed: {},
  watch: {
    plotData: function(newValue) {
      Plotly.react(this.$refs.tester, newValue, this.layout);
    }
  }
};
</script>
