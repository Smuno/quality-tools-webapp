<template>
  <b-container class="allWhys">
    <only1-w
      :levelCol="esteNivel"
      :yourLevel="inicio"
      :amIaChild="false"
      :key="'theGrandFather'"
      v-on:data-updated="allData=$event"
      v-on:star-road-data="starRoadData=$event"
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
  props: {
    uniqueId: {
      type: String,
      default: "DDDAAA"
    }
  },
  data() {
    return {
      esteNivel: 0,
      inicio: [1],
      allData:null,
      starRoadData:null,
    };
  },
  methods: {

  },
  computed: {
    result:function(){
      return {
        metadata: {
          toolName: "FiveWhy",
          id: this.uniqueId
        },
        data: this.allData,
        header: { tags:[] },
        body: {
          /* idTableResult es la id de los elementos en tabla que son relevantes:
          pareto: elementos que genera el 80% de los casos
          carta de control: elementos fuera de control (average and variability)
          */
         rootCause5Why:this.startRoadData
        },
      };
    }
  }
};
</script>

<style>
.allWhys {
  border-style: solid;
  border-radius: 4px;
  border-color: #545e63;
}
</style>
