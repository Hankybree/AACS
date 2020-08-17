<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- {{ this.$store.state }} -->
    <router-view></router-view>

    <FileUpload />
  </div>
</template>

<script>
import FileUpload from './components/file/FileUpload.vue'

export default {
  name: 'App',
  components: {FileUpload}
}
</script>

<style>
* {
  outline: none;
}

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
  color: white;
}
.content {
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>
