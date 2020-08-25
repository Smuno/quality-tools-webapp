<template>
  <b-container>
    <div ref="plotlyPlace"></div>
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
       * Contain instance of Plotly when component mounted
      */
      thePlot: null
    };
  },
  props: {
    /** 
     * Data to be plot (multiArray)
    */
    plotData: {
      type: Array,
      required: true
    },
    /** 
     * Graph layout
     * Object as described on plotly.com/javascript/layout-template/
    */
    layout: {
      type: Object,
      required:true
    }
  },
  methods: {

  },
  mounted() {
    /** 
     * Se inserta grafico en ref="plotlyPlace"
    */
    this.thePlot = Plotly.newPlot(
      this.$refs.plotlyPlace,
      this.plotData,
      this.layout,
      { responsive: true }
    );
  },
  computed: {},
  watch: {
    /** 
     * Cuando se detecta cambios en la data, se actualiza el grafico
     * (no se redibuja)
     * ? ¿Hacerlo tambien con layout?
    */
    plotData: function(newValue) {
      Plotly.react(this.$refs.plotlyPlace, newValue, this.layout);
    }
  }
};
</script>
