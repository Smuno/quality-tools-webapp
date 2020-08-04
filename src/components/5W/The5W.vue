<template>
    <b-container class="5W">
        <only1-w levelRow="1" :levelCol="esteNivel" />
    </b-container>
</template>

<script>
import Only1W from "./Only1W.vue"

export default {
    name:"The5W",
    components:{
        Only1W
    },
    data(){
        return{
            esteNivel:0
        }
    },
    methods: {
        
    },
    computed: {
        
    },
}
</script>

<style>
#mainRow{
    background-color: #ebecf1;
    text-align: left;
    
}


</style>