<template>
    <b-container class="5W">
        <only1-w levelRow="1" :levelCol="esteNivel" :yourLevel="inicio"  :amIaChild="false" :need-newrow="nadanarinas"/>
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
            esteNivel:0,
            inicio:[1],
        }
    },
    methods: {
        nadanarinas:function(){
            console.log('in The5W')
        }
        
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