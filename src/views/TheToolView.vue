<template>
  <b-container fluid>
    <b-button v-b-modal="'creator-modal'">Show Card</b-button>
    <b-row>
      <router-view @result-event="listen_result($event)" />
    </b-row>
    <b-modal id="creator-modal">
      <creator-of-cards
        v-if="resultFromTool"
        :toolMetaData="resultFromTool.metadata"
        :toolData="resultFromTool.data"
        :toolHeader="resultFromTool.header"
        :toolBody="resultFromTool.body"
      />
      <h5 v-else>Sin resultados</h5>
    </b-modal>
  </b-container>
</template>

<script>
import CreatorOfCards from "@/components/ResultCard/CreatorOfCards";
export default {
  name: "TheToolView",
  components: {
    CreatorOfCards
  },
  data() {
    return {
      resultFromTool: null
    };
  },
  methods: {
    listen_result: function(newResult) {
      this.resultFromTool = newResult;
    }
  }
};
</script>
