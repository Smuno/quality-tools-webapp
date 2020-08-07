<template>
  <b-container class="5W">
    <only1-w
      :levelCol="esteNivel"
      :yourLevel="inicio"
      :amIaChild="false"
      :need-newrow="nadanarinas"
      :key="'theGrandFather'"
      v-on:data-updated="allData=$event"
    />
  </b-container>
</template>

<script>
import Only1W from "./Only1W.vue";

export default {
  name: "The5W",
  components: {
    Only1W
  },
  data() {
    return {
      esteNivel: 0,
      inicio: [1],
      allData:null,
    };
  },
  methods: {
    nadanarinas: function() {
      console.log("in The5W");
    }
  },
  computed: {}
};
</script>

<style>
#mainRow {
  background-color: #b1b493;
  text-align: left;
}
</style>
