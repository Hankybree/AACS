<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- {{ this.$store.state }} -->
    <router-view></router-view>

    <FileUpload />
    <!-- <Public /> -->
    
  </div>
</template>

<script>
  
  // import Public from './components/Explorers/Public.vue'

  export default {
    created() {
      fetch('http://localhost:8000/fileuploads/')
        .then((response) => response.json())
        .then((result) => {
          this.$store.commit('setImages', result.data)
          console.log(result)
        })
    },
    name: 'App'
  }
</script>

<style>
  * {
    outline: none;
  }

  body,
  html {
    background-image: url('./assets/tempBg.png');
    margin: 0;
    padding: 0;
  }
  .whiteColor {
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
