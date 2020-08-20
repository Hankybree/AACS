<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- {{ this.$store.state }} -->
    <router-view></router-view>

    <FileUpload />
    <!-- <Public /> -->
    <input type="button" value="Log out" @click="logout">
  </div>
</template>

<script>
  import FileUpload from './components/file/FileUpload.vue'
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
    name: 'App',
    components: { FileUpload },
    methods: {
      logout() {
        this.$store.dispatch('logout')
      }
    }
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
