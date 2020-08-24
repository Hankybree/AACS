<template>
  <div class="content">
    <!-- Söka efter publika bilder -->
    <Public />
    
  </div>
</template>

<script>
  import Public from '../components/Explorers/Public'

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
    components: { Public },
    data() {
      return {
        loading: false,
        currentPage: 0
      }
    },
    methods: {
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
