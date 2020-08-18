<template>
  <b-container id="table">

    <TabulatorComponent
      v-model="userTable"
      v-on:row-added="userTable"
      ref="tabulator"
      :options="options"
      :integration="{ updateStrategy: 'REPLACE' }"
    />

  </b-container>
</template>

<script>
import { TabulatorComponent } from "vue-tabulator";

export default {
  name: "TableContainer",
  components: {
    TabulatorComponent
  },
  model: {
    prop: "userTable",
    event: "changeOnTable"
  },
  props: {
    userTable: Array,
    options: Object
  },
  data() {
    return {};
  },
  methods: {
    
  },
  mounted() {},
  watch: {
    userTable: function(newVal) {
      this.$emit("changeOnTable", newVal);
    }
  }
};
</script>
