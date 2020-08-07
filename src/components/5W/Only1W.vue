<template>
  <div>
    <b-row class="bg-info mainRow">
      <b-col class="text-light mainCol" :md="colSize" :id="actualLevel">
        <!-- Evento Crear nueva fila - el componente padre se preocupa-->
        <editor-content class="textFromThisLevel" :editor="editor" />
        <!-- Botones para añadir y remover sub-filas -->
        <b-button @click="userClick" variant="success" size="sm">+</b-button>
        <b-button
          v-show="!amIaChild && listRow.length > 0"
          @click="userClickRemove"
          variant="danger"
          size="sm"
          >x</b-button
        >
      </b-col>
      <!-- Crea siguiente columna - Hacia la derecha-->
      <b-col>
        <Only1W
          v-if="isThisTheEnd"
          :yourLevel="nextyourLevel"
          :key="actualLevel"
          :levelCol="levelCol + 1"
          v-model="textNextCol"
          v-on:data-updated="listenColData($event)"
        >
        </Only1W>
      </b-col>
    </b-row>
    <!-- Hacia Abajo - Nueva Fila en caso de click - se preocupa el padre -->
    <div v-if="isNewRow">
      <Only1W
        v-for="(fila, index) in listRow"
        :yourLevel="levelNewRow(index + 1)"
        :levelCol="levelCol"
        :key="index"
        :amIaChild="true"
        v-on:neednewrow="userClick"
        v-on:data-updated="listenRowData(index, $event)"
      >
      </Only1W>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent } from "tiptap";

export default {
  name: "Only1W",
  components: {
    EditorContent
  },
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
      count: 0,
      /* usado por tiptap */
      editor: null,
      /* Para el texto del editor del nivel presente */
      textCurrentLevel: null,
      /* data de la columna hijo - recursivo */
      textNextCol: null,
      /* data de la fila hijo */
      textNextRow: []
    };
  },
  methods: {
    /* Crea una nueva fila añadiendo elemento en listRow */
    newRow: function() {
      this.isNewRow = true;
      this.listRow.push(1);
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
    //Para remover una fila
    userClickRemove: function() {
      this.listRow.pop();
    },
    /* Crea etiqueta de nivel para nueva fila */
    levelNewRow: function(index) {
      let toreturn = this.yourLevel;
      toreturn[toreturn.length - 1] = index + 1;
      return toreturn;
    },
    /* Listener ante llegada de datos por fila */
    listenRowData: function(index, dataFromEvent) {
      this.textNextRow[index] = [dataFromEvent];
      this.textDataUpdate();
    },
    /* Ante llegada de datos por columna */
    listenColData: function(dataFromEvent) {
      this.textNextCol = dataFromEvent;
      this.textDataUpdate();
    },
    /* Ante cambios en cualquier nivel hijo o de este nivel */
    textDataUpdate: function() {
      this.textCurrentLevel = this.editor.getJSON().content[0].content[0].text;
      this.$forceUpdate();
      this.$emit("data-updated", this.allData);
    }
  },
  computed: {
    /* Crea etiqueta para siguiente columna - Funciona bien*/
    nextyourLevel: function() {
      const toreturn = this.yourLevel.concat(1);
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
        if (index === 0) stringLevel = el.toString();
        else stringLevel = stringLevel + "." + el.toString();
      });
      return stringLevel;
    },
    /* Arma objeto para ser entregado al padre via $emit en textDataUpdate */
    allData: function() {
      return {
        father: this.textCurrentLevel,
        columns: this.textNextCol,
        rows: this.textNextRow
      };
    }
  },
  mounted() {
    let timeoutTyping = null;
    this.editor = new Editor({
      content: "¿Por qué... " + this.actualLevel,
      onUpdate: () => {
        //Esperando que usuario termine de tipear
        clearTimeout(this.timeoutTyping);
        this.timeoutTyping = setTimeout(this.textDataUpdate, 1000);
      }
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  }
};
</script>

<style>
.mainCol {
  border-top-style: solid;
  border-bottom-style: solid;
  border-color: #545e63;
  background-color: #1b998b;
}
</style>
