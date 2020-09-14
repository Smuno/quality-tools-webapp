<template>
  <b-container fluid>
    <b-button @click="modal_showModal">Show Card</b-button>
    <b-row>
      <keep-alive>
        <router-view @result-event="listen_result($event)" />
      </keep-alive>
    </b-row>
    <b-modal ref="creator-modal">
      <creator-of-cards
        v-if="resultFromTool"
        :toolMetaData="resultFromTool.metadata"
        :toolData="resultFromTool.data"
        :toolHeader="resultFromTool.header"
        :toolBody="resultFromTool.body"
      />
      <h5 v-else>Sin resultados</h5>
      <template v-slot:modal-footer>
        <b-button @click="modal_SaveCard">Save</b-button>
      </template>
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
    },
    modal_showModal: function() {
      this.$refs["creator-modal"].show();
    },
    modal_SaveCard: function() {
      this.$store.commit("set_isDataSave", true);
      this.$refs["creator-modal"].hide();
    }
  }
};
</script>
