<template>
  <b-card no-body>
    <!--  -->
    <b-card-header>
      <b-badge
        v-for="(badge, index) in CardBadges"
        :key="index"
        :variant="badge.variant"
      >
        {{ badge.text }}
      </b-badge>
    </b-card-header>
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
        :contentForEditor="'<h2>Ingresa un Titulo,</h2><p>Añade una descripcion a tu carta de resultado <3</p>'"
        :isEditable="true"
        :onCard="true"
      />
      <component
        :is="currentTool.name"
        :resultData="currentTool.data"
      ></component>
    </b-card-body>
    <b-card-footer> </b-card-footer>
  </b-card>
</template>

<script>
import BaseTextInput from "../Generics/BaseTextInput";
import FiveWhyBody from "../ResultCard/ToolsBody/FiveWhyBody";
import ControlChartBody from "../ResultCard/ToolsBody/ControlChartBody";

export default {
  name: "CreatorOfCards",
  components: {
    BaseTextInput,
    FiveWhyBody
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
     * Important results from the tool that should be display on the card
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
     * Array of the badges to be display on the card using:
     * toolMetaData
     * @returns {array} Array of objects with 2 keys: text and variant of the badge to be show in the card
     */
    CardBadges: function() {
      //todo linkear badge id con los datos
      // Se añaden los tags fijos: toolName e id
      let badges = [
        { text: this.toolMetaData.toolName, variant: "primary" },
        { text: this.toolMetaData.id, variant: "info" }
      ];
      // Se añaden los tags provenientes de la herramieta
      badges.concat(
        this.toolHeader.tags.map((tag, index) => {
          return { text: tag, variant: "success" };
        })
      );
      return badges;
    },

    /**
     * determine current tool to be display on card
     * @returns {Object} with name and data to the correspnding component tool body
     */
    currentTool: function() {
      //determinar herramienta -> body component name
      let tool_name_component = "";
      let tool_result_component;
      switch (this.toolMetaData.toolName) {
        case "FiveWhy":
          tool_name_component = "FiveWhyBody";
          tool_result_component = this.toolBody.rootCause5Why;
          break;
        case "ControlChart":
          tool_name_component = "ControlChartBody";
          tool_result_component = this.toolBody.outOfContolTableResult;
          break;
        case "LotAcceptance":
          tool_name_component = "LotAcceptanceBody";
          tool_result_component;
          break;
        case "Pareto":
          tool_name_component = "ParetoBody";
          tool_result_component;
          break;
        default:
          break;
      }

      //asignar data

      return {
        name: tool_name_component,
        data: tool_result_component
      };
    }
  }
};
</script>
