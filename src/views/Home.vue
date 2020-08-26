<template>
  <div class="home">
    <b-row>
      <b-col cols="4">
        <result-card />
      </b-col>
    </b-row>
    <b-col cols="6">
    <base-text-input/>
    </b-col>
  </div>
</template>
<script>
// @ is an alias to /src
import ResultCard from "../components/ResultCard/ResultCard";
import BaseTextInput from '../components/Generics/BaseTextInput'

export default {
  name: 'Home',
  components:{
    ResultCard,
    BaseTextInput,
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
