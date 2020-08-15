<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/tempo">Tempo</router-link> |
      <router-link to="/pareto">Pareto</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">

html{
  background-color: #e5f6df;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f1faee;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<style lang='scss'>

@import "~vue-tabulator/dist/scss/bootstrap/tabulator_bootstrap4";

</style>