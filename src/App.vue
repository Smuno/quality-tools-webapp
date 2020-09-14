<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/tool/5W">5 Why</router-link> |
      <router-link to="/tool/Pareto">Pareto</router-link> |
      <router-link to="/tool/ControlChart">Control Chart</router-link> |
      <router-link to="/tool/Lotacceptance">Lot Acceptance</router-link> |
    </div>
    <transition>
      <b-container fluid id="views">
        <router-view />
      </b-container>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  watch: {}
};
</script>

<style lang="scss">


html {
  background-color: #f2fbef;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#views {
  margin-left: auto;
  margin-top: 30px;
  margin-right: auto;
  margin-bottom: -5px;
  text-align: center;
}

#nav {
  padding: 30px;
  background-color: #1b998b;
  border-bottom-style: solid;
  border-color: #545e63;
  a {
    font-weight: bold;
    color: #f0f0f0;

    &.router-link-exact-active {
      color: #016fb9;
    }
  }
}
</style>
