<template>
  <b-container fluid>
    <h6>Sample Size:{{ resultBody.sampleSize }}</h6>
    <b-row>
      <b-col id="reduced"><h5>No reduced yet</h5></b-col>
      <b-col id="normal">
        <h5>Regla Normal</h5>
        <p>Acceptance: {{ resultBody.rules.normal.acceptanceNumber }}</p>
        <p>Rejection: {{ resultBody.rules.normal.rejectionNumber }}</p>
      </b-col>
      <b-col id="tight"><h5>No tight yet</h5></b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "LotAcceptanceBody",
  props: {
    resultBody: {
      require: true,
      type: Object
    }
  },
  data() {
    return {};
  }
};
</script>
