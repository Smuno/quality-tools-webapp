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
      <p><span v-html="body.text"></span></p>
    </b-card-body>
    <b-card-footer> </b-card-footer>
  </b-card>
</template>

<script>
export default {
  name: "ResultCard",
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
    body: {
      type: Object,
      default: () => ({
        text: "Sample text of something here"
      })
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
