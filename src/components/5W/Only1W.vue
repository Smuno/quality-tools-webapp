<template>
  <div>
    <b-row>
      <b-col :class="variantRoad + ' mainCol'" :md="colSize" :id="actualLevel">
        <!-- Evento Crear nueva fila - el componente padre se preocupa-->
        <editor-content class="textFromThisLevel" :editor="editor" />
        <!-- Botones para añadir y remover sub-filas -->
        <b-button-group>
          <b-button
            v-if="levelCol > 0"
            @click="userClick"
            variant="success"
            size="sm"
          >
            <b-icon icon="plus-circle" />
          </b-button>
          <b-button
            v-if="!isNotTheEnd"
            variant="dark"
            size="sm"
            @click="createStarRoad"
          >
            <b-icon
              :icon="isThisStarRoad ? 'star-fill' : 'star'"
              variant="warning"
            />
          </b-button>
          <b-button
            v-show="!amIaChild && listRow.length > 0"
            @click="userClickRemove"
            variant="danger"
            size="sm"
          >
            <b-icon icon="x-square" />
          </b-button>
        </b-button-group>
      </b-col>
      <!-- Crea siguiente columna - Hacia la derecha-->
      <b-col>
        <Only1W
          v-if="isNotTheEnd"
          :yourLevel="nextyourLevel"
          :key="actualLevel"
          :levelCol="levelCol + 1"
          v-model="textNextCol"
          @data-updated="listenColData($event)"
          @star-road="isThisStarRoad = $event"
          @star-road-data="CALLroadData($event)"
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
        @neednewrow="userClick"
        @data-updated="listenRowData(index, $event)"
        @star-road="nextFather('star-road', $event)"
        @star-road-data="nextFather('star-road-data', $event)"
      >
      </Only1W>
    </div>
  </div>
</template>

<script>
//todo Mejorar alerta star-road, evitar usar $root.$emit
import { Editor, EditorContent } from "tiptap";
import _ from "lodash";

export default {
  name: "Only1W",
  components: {
    EditorContent
  },
  props: {
    /*levelCol Controla profundidad (nunmero de columnas) - 
    usado como parada en isNotTheEnd*/
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
      textNextRow: [],
      /* show button star */
      isThisStarRoad: false
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
      this.$root.$emit("star-road-off");
      // Crear nueva linea solo si es padre - Funcion no requiere cambios
      this.amIaChild ? this.$emit("neednewrow") : this.newRow();
    },
    //Para remover una fila
    userClickRemove: function() {
      this.$root.$emit("star-road-off");
      this.listRow.pop();
    },
    /* Crea etiqueta de nivel para nueva fila */
    levelNewRow: function(index) {
      let toreturn = this.yourLevel;
      toreturn[toreturn.length - 1] = index + 1;
      return toreturn;
    },
    /* Ante cambios en cualquier nivel hijo o de este nivel */
    textDataUpdate: function() {
      this.textCurrentLevel = this.editor.getJSON().content[0].content[0].text;
      this.$forceUpdate();
      this.$emit("data-updated", this.allData);

      if (!this.isNotTheEnd && this.isThisStarRoad) {
        this.$emit("star-road-data", [this.textCurrentLevel]);
      }
    },
    /* Listener ante llegada de datos por fila */
    listenRowData: function(index, dataFromEvent) {
      this.textNextRow[index] = [dataFromEvent];
      this.textDataUpdate();
    },
    /* Ante llegada de datos por columna - Callback for editor*/
    listenColData: function(dataFromEvent) {
      this.textNextCol = dataFromEvent;
      this.textDataUpdate();
    },

    /** metodos para star road */
    //* Se un nivel para pasar al padre correspondiente
    nextFather: function(nameEvent, starRoad) {
      this.$emit(nameEvent, starRoad);
    },
    /** Se crea un nuevo camino de causa raiz  */
    createStarRoad: function() {
      //Pasar datos en cadena hacia arriba
      const textStarRoad = this.textCurrentLevel;
      this.$emit("star-road-data", [textStarRoad]);

      /*Se elimina cualquier star-road existente
      y se setea lo que corresponde al boton
      */
      const beforeToggle = _.cloneDeep(this.isThisStarRoad);
      this.$root.$emit("star-road-off");
      setTimeout(() => {
        this.isThisStarRoad = !beforeToggle;
        this.$emit("star-road", this.isThisStarRoad);
      }, 10);
    },
    //* Traspasa la data de manera paralela desde la causa raiz hasta The5W
    CALLroadData: function(dataFromBellow) {
      const textStarRoad = _.cloneDeep(this.textCurrentLevel);
      dataFromBellow.unshift(textStarRoad);
      this.$emit("star-road-data", dataFromBellow);
    }
  },
  computed: {
    /* Crea etiqueta para siguiente columna - Funciona bien*/
    nextyourLevel: function() {
      const toreturn = this.yourLevel.concat(1);
      return toreturn;
    },
    /* determina si debe terminar de dibujar columnas (limitado a 4 por contexto 5Why)*/
    isNotTheEnd: function() {
      return this.levelCol < 4;
    },
    /* Determina ancho de columna segun profundidad - tabulado a la mala pero funciona
    ¿hay otra forma? */
    variantRoad: function() {
      this.$emit("star-road", this.isThisStarRoad);
      return this.isThisStarRoad ? "bg-warning" : "bg-info";
    },
    //? existe una manera que no sea a mano?
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
    /* Crea string para el nivel añadiendo puntos entre numeros
    Probablemente innecesario, pero ayuda para ref*/
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
        text: this.textCurrentLevel,
        columns: this.textNextCol,
        rows: this.textNextRow
      };
    }
  },
  mounted() {
    //* event for star road
    this.$root.$on("star-road-off", () => {
      this.isThisStarRoad = false;
    });
    //* text editor
    let timeoutTyping = null;
    const timeTyping = 500;
    this.editor = new Editor({
      content: "¿Por qué... " + this.actualLevel,
      onUpdate: () => {
        //Esperando que usuario termine de tipear
        clearTimeout(this.timeoutTyping);
        this.timeoutTyping = setTimeout(this.textDataUpdate, timeTyping);
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
  background-color: #016fb9;
}
</style>
