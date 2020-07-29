<!-- Componente para input de usario y output de condiciones de aceptacion de lote -->
<!--
    Inputs
        Usuario:
            AQL
            Inspection level
            Lot Size
        Data Interna:
            Tabla Code Letter (CodeLetter.js)
            Tabla Maestra de inspeccion: 
                Reduced
                Normal (a medias)
                Tihtened
-->
<template>
  <b-container>
    <b-row>
      <b-col>
        <b-form-select v-model="inspectionLevel" v-bind:options="options">
        </b-form-select>
        <b-form-input v-model="lotSize" type="number" placeholder="Tamaño Lote">
        </b-form-input>
        <b-form-select v-model="aql" v-bind:options="optionsAql" :select-size="4">
        </b-form-select>
      </b-col>
      <div>
        <b-col>
          {{ letter }}
          Sample size: {{gestSampleSize(letter)}}
          Aceptar: {{ rules.acceptanceNumber }} Rechazar:
          {{ rules.rejectionNumber }}
        </b-col>
      </div>
    </b-row>
  </b-container>
</template>

<script>
import { determineLetter, listInspectionLevels, determineSampleSize} from "./CodeLetter";
import { findRule, listAql } from "./InspectionMasterTable";

export default {
  name: "TheLotAcceptance",
  data() {
    return {
      lotSize: null,
      inspectionLevel: null,
      options: listInspectionLevels,
      optionsAql:listAql,
      aql:null,
    };
  },
  methods: {
    getLetterTable: determineLetter,
    getRules: findRule,
    gestSampleSize: determineSampleSize
  },
  computed: {
    letter: function() {
      console.log(
        "letter recibida",
        this.getLetterTable(this.inspectionLevel, this.lotSize)
      );
      return this.getLetterTable(this.inspectionLevel, this.lotSize);
    },
    rules: function() {
      console.log("rules", this.getRules(this.letter, this.aql));
      return this.getRules(this.letter, this.aql);
    },
  },
  mounted() {}
};
</script>
