<template>
  <b-card no-body>
    <!--  -->
    <b-card-header>
      <h2>{{ header.title }}</h2>
      <b-badge
        v-for="(badge, index) in header.badges"
        :key="index"
        :variant="badge.variant"
      >
        {{ badge.text }}
      </b-badge>
    </b-card-header>
    <b-card-body>
      <!-- 
        texto usuario
        resultado ¿que es un resultado?
        -->
      <base-text-input
        @new-text="showData($event)"
        :isEditable="true"
        :onCard="true"
      />
    </b-card-body>
    <b-card-footer> </b-card-footer>
  </b-card>
</template>

<script>
import BaseTextInput from "../Generics/BaseTextInput";

export default {
  name: "ResultCard",
  components: {
    BaseTextInput
  },
  props: {
    header: {
      type: Object,
      default: () => ({
        title: "Sin titulo",
        badges: [
          { text: "Default", variant: "info" },
          { text: "No Data", variant: "danger" }
        ]
      })
    },
    body: {}
  },
  data() {
    return {};
  },
  methods: {
    showData: function(indata) {
      this.bodyTextUserInput = indata;
    }
  }
};
</script>
