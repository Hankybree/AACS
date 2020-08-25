<template>
  <div id="app">
    <router-view></router-view>

    <button @click="$router.push({ name: 'PhotoView', params: '' })" >PhotoView</button>
    <div class="navbar" v-if="isLoggedIn">
      <router-link to="/feed"><font-awesome-icon :icon="['far', 'images']" /></router-link>
      <router-link to="/"><font-awesome-icon :icon="['fa', 'search']" /></router-link>
      <router-link to="/fileupload"><font-awesome-icon :icon="['far', 'plus-square']" /></router-link>
      <router-link to="/explorer"><font-awesome-icon :icon="['fa', 'th']" /></router-link>
      <router-link to="/profile"><font-awesome-icon :icon="['fas', 'user']" /></router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    computed: {
      isLoggedIn() {
        return this.$store.getters.isLoggedIn
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
    margin: 0;
    padding: 0;
    background-image: linear-gradient( 10.9deg,  rgba(34,34,34,1) 8.3%, rgb(9, 14, 41) 41.6%, rgb(26, 27, 90) 93.4% );
    background-repeat: no-repeat;
    height: 100%;
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

  .navbar {
    background: #060916;
    bottom: 0;
    position: fixed;
    width: 100%;
    display: flex;
  }

  .navbar a {
    display: inline-flex;
    color: white;
    font-size: 20pt;
    padding: 10px 0;
    margin: auto;
  }
</style>
