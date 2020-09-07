<template>
  <b-card no-body>
    <!--  -->
    <b-card-header> </b-card-header>
    <b-card-body>
      <!-- 
        texto usuario
        resultados:
          5W: Lista de preguntas - destacar causa raiz
          Pareto: Lista de elementos importantes con su porcentaje (de mayor a menor)
          Lot Acceptance: Las 3 reglas de aceptacion
          Control Chart: Indicar tipo de grafico - muestras fuera de control (mini grafico?) + analisis
        -->
      <base-text-input
        @new-text="onTextInputChange(bodyDescription, $event)"
        :isEditable="true"
        :onCard="true"
      />
    </b-card-body>
    <b-card-footer> </b-card-footer>
  </b-card>
</template>

<script>
import BaseTextInput from "../Generics/BaseTextInput";

export default {
  name: "CreatorOfCards",
  components: {
    BaseTextInput
  },
  props: {
    /**
     * information not part of the result
     */
    toolMetaData: { type: Object },
    /**
     * All data from the tool to be upload to server
     */
    toolData: {
      required: true
    },
    /**
     * Information about the variables and options used on the tool
     */
    toolHeader: {
      type: Object,
      default: () => ({
        badges: [
          { text: "Default", variant: "info" },
          { text: "No Data", variant: "danger" }
        ]
      })
    },
    /**
     * Important results from the tool
     */
    toolBody: {
      type: Object
    }
  },
  data() {
    return {
      bodyDescription: ""
    };
  },
  methods: {
    /**
     * Insert text data(indata) to data propertie (dataHolder)
     * @param {String} dataHolder propertie on data object
     * @param {String} indata data from the text input
     */
    onTextInputChange: function(dataHolder, indata) {
      dataHolder = indata;
    }
  },
  computed: {
    /**
     * Array of the tags to be display on the card using:
     * toolMetaData
     * @returns {Array} Array of the tags to be show in the card
     */
    CardTags: function() {
      return [this.toolMetaData.toolName, this.toolMetaData.id].concat(
        this.toolHeader.badges
      );
    }
  }
};
</script>
