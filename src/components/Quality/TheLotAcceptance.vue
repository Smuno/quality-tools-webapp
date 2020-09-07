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
            Tightened
    Output
      Al usuario:
        Sample Size (tamaño de la muestra)
        Reglas de Aceptacion/rechazo para las 3 tablas

-->
<template>
  <b-container>
    <b-row>
      <b-col>
        <!-- Nivel de inspeccion -->
        <b-form-select
          v-model="inspectionLevel"
          v-bind:options="options"
        ></b-form-select>
        <!-- Tamaño del lote -->
        <b-form-input
          v-model="lotSize"
          type="number"
          placeholder="Tamaño Lote"
        ></b-form-input>
        <!-- Seleccion AQL  -->
        <b-form-select
          v-model="aql"
          v-bind:options="optionsAql"
          :select-size="4"
        >
        </b-form-select>
        <!-- Info Card: Explicacion de los datos anteriores -->
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-1 variant="info">
              Informacion
            </b-button>
          </b-card-header>
          <b-collapse id="accordion-1" role="tabpanel">
            <b-card-body>
              <b-card-text>
                ^ Info sobre los datos a ingresar arriba ^
              </b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>
      </b-col>
      <!-- Columna derecha: resultados del formulario anterior -->
      <b-col>
        <b-card no-body border-variant="primary">
          <!-- Header Card: Para mostrar datos de entrada en formulario -->
          <b-card-header>
            <b-badge variant="primary" v-show="lotSize > 0">
              Tamaño Lote: {{ lotSize }}
            </b-badge>

            <b-badge variant="primary" v-show="inspectionLevel"
              >Nivel Inspección {{ inspectionLevel }}</b-badge
            >

            <b-badge variant="primary" v-show="aql > 0">
              Acceptable Quality Level {{ aql }}
            </b-badge>
          </b-card-header>
          <!-- Body card: Resultados del formulario -->
          <b-card-body class="text-center">
            <h5 v-show="gestSampleSize(letter) > 0">Tamaño de la muestra</h5>
            <b-card-title>{{ gestSampleSize(letter) }}</b-card-title>
            <b-card-text>
              <b-row v-show="rules.acceptanceNumber > -1">
                Aceptar: {{ rules.acceptanceNumber }}
              </b-row>
              <b-row v-show="rules.rejectionNumber > 0">
                Rechazar: {{ rules.rejectionNumber }}
              </b-row>
            </b-card-text>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {
  determineLetter,
  listInspectionLevels,
  determineSampleSize
} from "./CodeLetter";
import { findRule, listAql } from "./InspectionMasterTable";

export default {
  name: "TheLotAcceptance",
  props: {
    uniqueId: {
      type: String,
      default: "000AAA"
    }
  },
  data() {
    return {
      lotSize: null,
      inspectionLevel: null,
      options: listInspectionLevels,
      optionsAql: listAql,
      aql: null
    };
  },
  methods: {
    getLetterTable: determineLetter,
    getRules: findRule,
    gestSampleSize: determineSampleSize
  },
  computed: {
    letter: function() {
      return this.getLetterTable(this.inspectionLevel, this.lotSize);
    },
    rules: function() {
      return this.getRules(this.letter, this.aql);
    },
    result: function() {
      return {
        metadata: { toolName: "Lot Acceptance", id: this.uniqueId },
        data: [this.lotSize,this.inspectionLevel,this.aql],
        header: {
          tags: [
            "Lot Size:" + this.lotSize,
            "Inspection Type: " + this.inspectionLevel,
            "Acceptable Quality Level: " + this.aql
          ]
        },
        body: {
          rules:{
            reduced:[],
            normal:this.rules,
            tight:[]
          }
        }
      };
    }
  },
  mounted() {}
};
</script>
