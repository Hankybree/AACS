<template>
  <div class="content">
    <!-- Söka efter publika bilder -->
    <Feed v-if="showFeed" />
    <Public v-else />
    <!-- TEMP -->
    <FileUpload />

    <input type="button" value="Log out" @click="$store.dispatch('logout')" />
    <!-- END TEMP -->
    <div class="imagedisplay-buttons-container">
      <span>
        <button class="buttons feedbutton" @click="toggleFeed">FEED</button>
        <button class="buttons" @click="toggleGrid">Masonry</button>
      </span>
    </div>
  </div>
</template>

<script>
  import Feed from '../components/Explorers/Feed'
  import Public from '../components/Explorers/Public'
  import FileUpload from '../components/file/FileUpload'

  export default {
    beforeCreate() {
      this.$store.dispatch('connect')

      window.addEventListener('scroll', () => {
        this.handleScroll()
      })
    },
    created() {
      this.getImages()
    },
    name: 'ExplorerView',
    components: { Feed, Public, FileUpload },
    data() {
      return {
        showFeed: false,
        loading: false,
        currentPage: 0
      }
    },
    methods: {
      toggleFeed() {
        this.showFeed = true
      },
      toggleGrid() {
        this.showFeed = false
      },
      getImages() {
        fetch('http://localhost:8000/images/', {
          headers: {
            CurrentPage: this.currentPage
          },
          method: 'GET'
        })
          .then((response) => response.json())
          .then((result) => {
            if (this.currentPage === 0) {
              this.$store.commit('setImages', result.data)
            } else {
              this.$store.commit('appendImages', result.data)
            }
            this.loading = false
            console.log(result)
          })
      },
      handleScroll() {
        if (
          window.innerHeight + window.scrollY >= document.body.offsetHeight &&
          !this.loading
        ) {
          this.loading = true
          this.currentPage++
          this.getImages()
        }
      }
    }
  }
</script>

<style scoped>
  .imagedisplay-buttons-container {
    width: 100%;
    background-color: grey;
    position: fixed;
    bottom: 0;
  }

  /*  BUTTON ATTRIBUTES */

  .buttons {
    width: 40%;
    height: 3em;
  }

  .feedbutton {
    background-color: blue;
  }
</style>
