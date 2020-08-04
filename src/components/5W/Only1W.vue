<template>
  <div>
    <b-row>
      <b-col class="bg-secondary text-light rowMain" :md="colSize">
        <!-- Evento Crear nueva fila - el componente padre se preocupa-->
        <p @click="userClick">Actual Level {{ actualLevel }}</p>
      </b-col>
      <!--  Hacia la derecha-->
      <b-col>
        <Only1W
          v-if="isThisTheEnd"
          :yourLevel="nextyourLevel"
          :levelCol="levelCol + 1"
        >
        </Only1W>
      </b-col>
    </b-row>
    <!-- Hacia Abajo - Nueva Fila en caso de click - se preocupa el padre -->
    <div v-if="isNewRow">
      <Only1W
        v-for="(fila, index) in listRow"
        :yourLevel="levelNewRow(index+1)"
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
    /*levelCol Controla profundidad (nunmero de columnas) - 
    usado como parada en isThisTheEnd*/
    levelCol: Number,
    /* Padre controla el nivel (ej 1.1.2)
    de la forma [1][1][2] - no debe cambiar */
    yourLevel: Array,
    /* Para saber si es un hijo ¿hay forma mas eficiente? */
    amIaChild: Boolean
  },
  data() {
    return {
      /* Controla visualizacion de una nueva fila - se cambia en newRow*/
      isNewRow: false,
      /* Controla nuevas filas dentro de la instancia, cada click (userClick) añade
      un nuevo elemento en listRow que visualiza fila en v-for */
      listRow: [],
      count:0,
    };
  },
  methods: {
    /* Crea una nueva fila añadiendo elemento en listRow */
    newRow: function() {
      console.log("---newRow-----");
      console.log("Click");
      //console.log(this.$refs);
      this.isNewRow = true;
      this.listRow.push(1);
      console.log("listRow: ", this.listRow);
      console.log("---------------");
    },
    /* En click controla si crear nueva linea o solicitar al padre que lo haga */
    userClick: function() {
      // Crear nueva linea solo si es padre - Funcion no requiere cambios
      if (this.amIaChild) {
        this.$emit("neednewrow");
      } else {
        this.newRow();
      }
    },
    /* Crea etiqueta de nivel para nueva fila- REQUIERE MODIFICACION */
    levelNewRow: function(index) {
      let toreturn = this.yourLevel;
      console.log("----levelNewRow---------");
      console.log("yourLevel: ", this.yourLevel);
      console.log('index: ',index)
      toreturn[toreturn.length - 1] = index+1;
      console.log("return: ", toreturn);
      console.log("------------------------");
      return toreturn;
    }
  },
  computed: {
    /* Crea etiqueta para siguiente columna - Funciona bien*/
    nextyourLevel: function() {
      const toadd = 1;
      const toreturn = this.yourLevel.concat(toadd);
      return toreturn;
    },
    /* determina si debe terminar de dibujar columnas (limitado a 4 por contexto 5Why) */
    isThisTheEnd: function() {
      return this.levelCol < 4;
    },
    /* Determina ancho de columna segun profundidad - tabulado a la mala pero funciona
    ¿hay otra forma? */
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
    /* Crea string para el nivel añadiendo puntos entre numeros- funciona bien */
    actualLevel: function() {
      let stringLevel = "";
      this.yourLevel.forEach((el, index) => {
        if (index === 0) {
          //console.log('index 0: '+el.toString())
          //console.log('index 0 num: ',el)
          stringLevel = el.toString();
        } else {
          //console.log('no index 0: '+el.toString())
          //console.log('no index 0 num: ',el)
          stringLevel = stringLevel + "." + el.toString();
        }
      });
      return stringLevel;
    }
  }
};
</script>

<style >
.rowMain {
  border-top-style: solid;
  border-bottom-style: solid;
}
</style>
