<template>
  <div class="home">
    <b-row>
      <b-col cols="4">
        <result-card />
      </b-col>
    </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import ResultCard from "../components/ResultCard/ResultCard";

export default {
  name: "Home",
  components: {
    ResultCard,
  },
  data() {
    return {
      
    };
  },
  methods: {
  },
  mounted() {},
  beforeDestroy() {
  }
};
</script>
