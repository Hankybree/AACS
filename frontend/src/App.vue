<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    {{ this.$store.state }}
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body, html{
  background-image: url("./assets/tempBg.png");
  margin: 0;
  padding: 0;
}
.whiteColor{
  color: white;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.content {
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>
