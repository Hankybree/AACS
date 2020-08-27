<template>
  <div id="app">
    <router-view></router-view>

    <!-- <button @click="$router.push({ name: 'PhotoView', params: '' })">
      PhotoView
    </button> -->
    <div class="navbar" v-if="isLoggedIn">
      <router-link to="/feed"
        ><font-awesome-icon :icon="['far', 'images']"
      /></router-link>
      <router-link to="/"
        ><font-awesome-icon :icon="['fa', 'search']"
      /></router-link>
      <router-link to="/fileupload"
        ><font-awesome-icon :icon="['far', 'plus-square']"
      /></router-link>
      <router-link to="/explorer"
        ><font-awesome-icon :icon="['fa', 'th']"
      /></router-link>
      <router-link :to="'/profile/' + 'profileDetails'"
        ><font-awesome-icon :icon="['fas', 'user']"
      /></router-link>
    </div>
  </div>
</template>

<script>
  export default {
    created() {
      let deferredPrompt

      window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault()
        // Stash the event so it can be triggered later.
        deferredPrompt = e
        // Update UI notify the user they can install the PWA
        showInstallPromotion()
      })
    },
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

  .navbar {
    background: #11193f;
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
