<template>
  <div id="app">
    <input v-if="showInstallButton" type="button" value="Install" @click="installApp">
    <router-view></router-view>

    <!-- <button @click="$router.push({ name: 'PhotoView', params: '' })">
      PhotoView
    </button> -->
    <div class="navbar" v-if="isLoggedIn">
      <router-link :style="{ color: $store.state.buttonColor }" to="/feed"
        ><font-awesome-icon :icon="['far', 'images']"
      /></router-link>
      <router-link :style="{ color: $store.state.buttonColor }" to="/"
        ><font-awesome-icon :icon="['fa', 'search']"
      /></router-link>
      <router-link :style="{ color: $store.state.buttonColor }" to="/fileupload"
        ><font-awesome-icon :icon="['far', 'plus-square']"
      /></router-link>
      <router-link :style="{ color: $store.state.buttonColor }" to="/explorer"
        ><font-awesome-icon :icon="['fa', 'th']"
      /></router-link>
      <router-link
        :style="{ color: $store.state.buttonColor }"
        :to="'/profile/' + 'profileDetails'"
        ><font-awesome-icon :icon="['far', 'user']"
      /></router-link>
    </div>
  </div>
</template>

<script>
  export default {
    created() {

      // Handles online/offline
      addEventListener('offline', () => {
        this.$store.commit('setButtonColor', 'red')
        alert('Offline')
      })
      addEventListener('online', () => {
        this.$store.commit('setButtonColor', 'white')
        alert('Online')
      })

      // Handles custom install

      window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault()
        // Stash the event so it can be triggered later.
        if(!this.installingApp && !this.appInstalled && !this.declinedInstall) {
          this.installingApp = true
          this.deferredPrompt = e
          // Update UI notify the user they can install the PWA
          this.showInstallPromotion()
        }
      })

      window.addEventListener('appinstalled', (evt) => {
        // Log install to analytics
        alert('App installed!')
        this.appInstalled = true
        this.installingApp = false
      })
    },
    name: 'App',
    data() {
      return {
        deferredPrompt: null,
        showInstallButton: false,
        installingApp: false,
        appInstalled: false,
        declinedInstall: false
      }
    },
    methods: {
      showInstallPromotion() {

        this.showInstallButton = true
      },
      installApp() {
        this.showInstallButton = false

        this.deferredPrompt.prompt()

        // Wait for the user to respond to the prompt
        this.deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt')
          } else {
            console.log('User dismissed the install prompt')
            this.declinedInstall = true
            this.installingApp = false
          }
        })
      }
    },
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
    background-image: linear-gradient(
      10.9deg,
      #222222 8.3%,
      rgb(9, 14, 41) 41.6%,
      rgb(26, 27, 90) 93.4%
    );
    background-repeat: no-repeat;
    background-attachment: fixed;
    width: 100%;
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

  }
  .content {
    width: 100%;
    margin: 0;
    padding: 0;
  }


  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active  {
transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: #fff !important;
  }

  .navbar {
    background: #1a1818;
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
