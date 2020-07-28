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
                Normal
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
      </b-col>
      <b-col v-show="getLetterTable(inspectionLevel,lotSize)!==-1" >
          Letra de entrada: {{getLetterTable(inspectionLevel,lotSize)}}
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { determineLetter, listInspectionLevels } from "./CodeLetter";

export default {
  name: "TheLotAcceptance",
  data() {
    return {
      lotSize: null,
      inspectionLevel: null,
      options: listInspectionLevels
    };
  },
  methods:{
      getLetterTable:determineLetter
  },
  mounted() {}
};
</script>
