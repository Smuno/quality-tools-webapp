<template>
  <div>
    <b-row>
      <b-col class="bg-secondary text-light rowMain" :md="colSize">
        <!-- Evento Crear nueva fila - el componente padre se preocupa-->
        <p @click="userClick">Actual Level {{actualLevel}}</p>
      </b-col>
      <!--  Hacia la derecha-->
      <b-col>
        <Only1W
          v-if="isThisTheEnd"
          :yourLevel="nextyourLevel"
          :ref="'rowMain' + levelRow + levelCol"
          :levelRow="nextLevel"
          :levelCol="levelCol + 1"
        >
        </Only1W>
      </b-col>
    </b-row>
    <!-- Hacia Abajo - Nueva Fila en caso de click - se preocupa el padre -->
    <div v-if="isNewRow">
      <Only1W
        v-for="(fila, index) in listRow"
        :yourLevel="levelNewRow(index)"
        :ref="'newRow' + levelRow + levelCol + index"
        :levelRow="levelRow.slice(0, -1) + (fila + 1)"
        :levelCol="levelCol"
        :key="index"
        :amIaChild="true"
        v-on:neednewrow="userClick"
      >
      </Only1W>
    </div>
  </div>
</template>

<script>
export default {
  name: "Only1W",
  props: {
    levelRow: String,
    levelCol: Number,
    yourLevel: Array,
    amIaChild:Boolean
  },
  data() {
    return {
      isNewRow: false,
      listRow: [],
      text: null
    };
  },
  methods: {
    newRow: function() {
      console.log("click");
      console.log(this.$refs);
      if (!this.isNewRow) {
        this.isNewRow = true;
        this.listRow.push(1);
      } else {
        this.listRow.push(this.listRow[this.listRow.length - 1] + 1);
      }
    },
    userClick:function(){
      if (this.amIaChild){
        console.log('yes I am a child')
        this.$emit('neednewrow')
      }else{
        console.log('I am father')
        this.newRow()
      }
    },
    levelNewRow: function (index){
      let toreturn=this.yourLevel
      toreturn[toreturn.length-1]=toreturn[toreturn.length-1]+1
      return toreturn
    }
  },
  computed: {
    //modificar a nuevo estandar array (levelFather)
    nextLevel: function() {
      return this.levelRow + ".1";
    },
    nextyourLevel: function(){
      const toadd=1
      const toreturn=this.yourLevel.concat(toadd)
      return toreturn
    },
    isThisTheEnd: function() {
      return this.levelCol < 4;
    },
    colSize: function() {
      let innerSize = 3;
      switch (this.levelCol) {
        case 0:
          innerSize = 3;
          break;
        case 1:
          innerSize = 3;
          break;
        case 2:
          innerSize = 4;
          break;
        case 3:
          innerSize = 6;
          break;
        case 4:
          innerSize = 12;
          break;
        default:
          break;
      }
      return innerSize;
    },
    actualLevel: function() {
      let stringLevel = "";
      this.yourLevel.forEach((el, index) => {
        if (index === 0) {
          stringLevel=el.toString()
        } else {
          stringLevel = stringLevel + "." + el.toString();
        }
      });
      return stringLevel
    }
  }
};
</script>

<style scoped>
.rowMain {
  border-top-style: solid;
  border-bottom-style: solid;
}
</style>
