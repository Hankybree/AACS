<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- {{ this.$store.state }} -->
    <router-view></router-view>

    <FileUpload />
    <!-- <Public /> -->
    <TestImages />
  </div>
</template>

<script>
  import FileUpload from './components/file/FileUpload.vue'
  // import Public from './components/Explorers/Public.vue'
  import TestImages from './components/Explorers/TestImages.vue'

  export default {
    // created() {
    // Testar så att sockets funkar
    // let socket = new WebSocket('ws://localhost:8000')
    // socket.onopen = () => {
    //   socket.send('Hello server')
    // }
    // socket.onmessage = (message) => {
    //   console.log(message.data)
    // }
    // Slut test
    // },
    created() {
      fetch('http://localhost:8000/fileuploads/')
        .then((response) => response.json())
        .then((result) => {
          this.$store.commit('setImages', result.data)
          console.log(result)
        })
    },
    name: 'App',
    components: { FileUpload, TestImages }
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
