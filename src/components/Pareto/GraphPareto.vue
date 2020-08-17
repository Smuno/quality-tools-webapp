<template>
  <b-container>
    <div ref="tester"></div>
  </b-container>
</template>

<script>
import Plotly from "plotly.js-dist";

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
    const layout = {
        title: "Pareto",
        margin: { t: 40 },
        yaxis: {
          title: "# Ocurrencias",
          titlefont: { color: "#1f77b4" },
          tickfont: { color: "#1f77b4" }
        },
        yaxis2: {
          title: "% acumulativo",
          titlefont: { color: "#ff7f0e" },
          tickfont: { color: "#ff7f0e" },
          side: "right",
          overlaying: "y",
          range: [0, 110]
        }
      };
    this.thePlot = Plotly.newPlot(
      this.$refs.tester,
      [
        {
          x: this.plotData.xNames,
          y: this.plotData.yBar,
          type: "bar"
        }
      ],layout,
      { responsive: true }
    );
  },
  watch: {
    plotData: function(newValue) {
      console.log(newValue);
      const bar = {
        x: newValue.xNames,
        y: newValue.yBar,
        name: "Problemas",
        type: "bar"
      };
      const line = {
        x: newValue.xNames,
        y: newValue.yLine,
        name: "Problemas",
        type: "line",
        yaxis: "y2"
      };
      const layout = {
        title: "Pareto",
        margin: { t: 40 },
        yaxis: {
          title: "# Ocurrencias",
          titlefont: { color: "#1f77b4" },
          tickfont: { color: "#1f77b4" }
        },
        yaxis2: {
          title: "% acumulativo",
          titlefont: { color: "#ff7f0e" },
          tickfont: { color: "#ff7f0e" },
          side: "right",
          overlaying: "y",
          range: [0, 110]
        }
      };
      const insidePlotData = [bar, line];
      Plotly.react(this.$refs.tester, insidePlotData,layout);
    }
  }
};
</script>
