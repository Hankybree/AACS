<template>
  <div class="content">
    <!-- Söka efter publika bilder -->
    <Feed v-if="showFeed" />
    <Public v-else />

    <button @click="toggleFeed">FEED</button>
    <button @click="toggleGrid">Masonry</button>
    <!-- TEMP -->
    <!-- <router-link :to="{ name: 'AuthView', params: { page: 'login' }}"><span class="whiteColor">Login</span></router-link> -->
  </div>
</template>

<script>
  import Feed from '../components/Explorers/Feed'
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
    components: { Feed, Public },
    data() {
      return {
        showFeed: false,
        loading: false
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
        fetch('http://localhost:8500/images', {
          headers: {
            CurrentPage: this.$store.state.currentPage
          },
          method: 'GET'
        })
          .then((response) => response.json())
          .then((result) => {
            this.$store.commit('appendImages', result.data)
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
          this.$store.commit(
            'setCurrentPage',
            this.$store.state.currentPage + 1
          )
          this.getImages()
        }
      }
    }
  }
</script>

<style scoped></style>
