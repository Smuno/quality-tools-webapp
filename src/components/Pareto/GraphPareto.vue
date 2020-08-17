<template>
  <b-container>
    <div ref="tester"></div>
  </b-container>
</template>

<script>
import Plotly from "plotly.js-dist";

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
    },
    layout: Object
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
      ],
      this.layout,
      { responsive: true }
    );
  },
  computed: {},
  watch: {
    plotData: function(newValue) {
      const bar = {
        x: newValue.xNames,
        y: newValue.yBar,
        name: "Problemas",
        type: "bar"
      };
      const topbar = {
        x: newValue.xNames,
        y: newValue.ytopBar,
        mode:'markers',
        name:'Top 80%',
        type: "scatter",
        yaxis:"y2",
        marker: {
          color: "rgb(219, 64, 82)",
          size: 12,
        }
      };
      const line = {
        x: newValue.xNames,
        y: newValue.yLine,
        name: "%",
        type: "line",
        yaxis: "y2"
      };
      const insidePlotData = [bar,line,topbar];
      Plotly.react(this.$refs.tester, insidePlotData, this.layout);
    }
  }
};
</script>
