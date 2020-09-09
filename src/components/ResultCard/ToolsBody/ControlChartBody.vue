<template>
  <b-container fluid>
    <!-- Contar elementos fuera de control para average y variability
    distinguir entre xr y xs
     -->
    <p>Elements out of Control</p>
    <b-list-group flush id="ControlChart Body List">
      <b-list-group-item
        v-for="(row, index) in resultBody.outOfContolTableResult"
        :key="index"
        :variant="index == 4 ? '' : 'warning'"
      >
        {{ row.id }}
      </b-list-group-item>
    </b-list-group>
    <p>Hay {{ numberOfOutOfControl }} elementos fuera de control</p>
    <p>{{ resultBody.analysis }}</p>
  </b-container>
</template>

<script>
export default {
  name: "ControlChartBody",
  props: {
    resultBody: {
      require: true,
      type: Object
    }
  },
  computed: {
    numberOfOutOfControl: function() {
      return this.resultBody.outOfContolTableResult.length;
    }
  }
};
</script>
