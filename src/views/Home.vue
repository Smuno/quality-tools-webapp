<template>
  <div class="home">
    <the-lot-acceptance/>
  </div>
</template>

<script>
// @ is an alias to /src
import TheLotAcceptance from "../components/Quality/TheLotAcceptance.vue"
import TableTabulator from "../components/Generics/TableTabulator"

export default {
  name: 'Home',
  components:{
    TheLotAcceptance,
    TableTabulator
  },
  data(){
    return{

    }
  },
  methods:{

  }
}
</script>
