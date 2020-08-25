<template>
  <b-container class="allWhys">
    <only1-w
      :levelCol="esteNivel"
      :yourLevel="inicio"
      :amIaChild="false"
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
  },
  computed: {}
};
</script>

<style>
.allWhys {
  border-style: solid;
  border-radius: 4px;
  border-color: #545e63;
}
</style>
