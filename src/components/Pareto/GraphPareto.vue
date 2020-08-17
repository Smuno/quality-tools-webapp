<template>
  <b-container>
    <div ref="tester"></div>
  </b-container>
</template>

<script>
import Plotly from "plotly.js-dist";
import {LAYOUT} from './GraphConfig.js'


//Limpiar layout - codigo repetido
export default {
  name: "GraphPareto",
  data() {
    return {
      thePlot: null
    };
  },
  props: {
    plotData: {
      type: Object,
      required: true
    }
  },
  methods: {},
  mounted() {
    this.thePlot = Plotly.newPlot(
      this.$refs.tester,
      [
        {
          x: this.plotData.xNames,
          y: this.plotData.yBar,
          type: "bar"
        }
      ],LAYOUT,
      { responsive: true }
    );
  },
  computed: {
  },
  watch: {
    plotData: function(newValue) {
      const bar = {
        x: newValue.xNames,
        y: newValue.yBar,
        name: "Problemas",
        type: "bar"
      };
      const line = {
        x: newValue.xNames,
        y: newValue.yLine,
        name: "%",
        type: "line",
        yaxis: "y2"
      };
      const insidePlotData = [bar, line];
      Plotly.react(this.$refs.tester, insidePlotData,LAYOUT);
    }
  }
};
</script>
