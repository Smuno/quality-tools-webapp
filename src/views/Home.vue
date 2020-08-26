<template>
  <div class="home">
    <b-col cols="6">
    <base-text-input/>
    </b-col>
  </div>
</template>
<script>
// @ is an alias to /src
import BaseTextInput from '../components/Generics/BaseTextInput'

export default {
  name: 'Home',
  components:{
    BaseTextInput,
  },
  data(){
    return{

    }
  },
  methods:{

  }
}
</script>
