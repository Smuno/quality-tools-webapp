<template>
  <div>
    <b-row>
      <b-col class="bg-secondary text-light rowMain" :md="colSize">
        <b-form-input v-model="text" placeholder="WHY?"></b-form-input>
        <p @click="newRow">WHY {{ levelRow }}</p>
      </b-col>
      <b-col>
        <Only1W
          v-if="isThisTheEnd"
          :levelRow="nextLevel"
          :levelCol="levelCol + 1"
        >
        </Only1W>
      </b-col>
    </b-row>
    <!-- Nueva Fila en caso de click -->
    <div v-if="isNewRow">
      <Only1W
        v-for="(fila, index) in listRow"
        :levelRow="levelRow.slice(0,-1)+fila"
        :levelCol="levelCol"
        :key="index"
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
    levelCol: Number
  },
  data() {
    return {
      isNewRow: false,
      listRow: [1],
      text:null,
    };
  },
  methods: {
    newRow: function() {
      console.log("click");
      if (this.listRow.length<1) {
        this.listRow.push(this.listRow[this.listRow.length - 1] + 1);
      }
      
      this.isNewRow = true;
    }
  },
  computed: {
    nextLevel: function() {
      return this.levelRow + ".1";
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
    }
  }
};
</script>

<style scoped>
  .rowMain{
    border-top-style: solid;
    border-bottom-style: solid;
  }
</style>