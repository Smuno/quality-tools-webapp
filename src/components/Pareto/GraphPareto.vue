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
    this.thePlot = Plotly.newPlot(
      this.$refs.tester,
      [
        {
          x: this.plotData.xData,
          y: this.plotData.yData,
          type:'bar'
        }
      ],
      {
        margin: { t: 0 }
      }
    );
  },
  watch: {
    plotData: function(newValue) {

      Plotly.react(
        this.$refs.tester,
        [
          {
            x: newValue.xData,
            y: newValue.yData,
            type:'bar'
          }
        ],
        {
          margin: { t: 0 }
        }
      );
    }
  }
};
</script>
