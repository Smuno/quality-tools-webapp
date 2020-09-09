<template>
  <b-list-group flush id="FiveWhy List">
    <b-list-group-item
      v-for="(question, index) in resultBody.rootCause5Why"
      :key="index"
      :variant="index == 4 ? 'warning' : ''"
    >
      {{ question }}
    </b-list-group-item>
  </b-list-group>
</template>

<script>
export default {
  name: "FiveWhyBody",
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
