<template>
  <b-row>
    <b-col>
      <base-text-input @new-text="showData($event)" />
    </b-col>
    <b-col>
      <result-card />
    </b-col>
  </b-row>
</template>

<script>
// @ is an alias to /src
import ResultCard from "../components/ResultCard/ResultCard";
import BaseTextInput from "../components/Generics/BaseTextInput";

export default {
  name: "Home",
  components: {
    ResultCard,
    BaseTextInput
  },
  data() {
    return {
      bodyTextUserInput:null,
    };
  },
  methods: {
    showData: function(indata) {
      this.bodyTextUserInput=indata
    }
  },
  mounted() {},
  beforeDestroy() {}
};
</script>
