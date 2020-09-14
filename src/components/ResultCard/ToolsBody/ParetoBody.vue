<template>
  <b-list-group flush id="ParetoBody List">
    <b-list-group-item
      v-for="(row, index) in resultBody.top80TableResult"
      :key="index"
    >
      {{ row.x0 }}: {{row.x1}}
    </b-list-group-item>
  </b-list-group>
</template>

<script>
export default {
  name: "ParetoBody",
  props: {
    resultBody: {
      require: true,
      type:Object
    }
  },
  mounted() {
  }
};
</script>
