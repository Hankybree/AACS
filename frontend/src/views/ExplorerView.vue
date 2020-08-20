<template>
  <div class="content">
    <!-- Söka efter publika bilder -->
    <Feed v-if="showFeed" />
    <Public v-else />

    <button @click="toggleFeed">FEED</button>
    <button @click="toggleGrid">Masonry</button>

    <!-- TEMP -->
    <FileUpload />

    <input type="button" value="Log out" @click="$store.dispatch('logout')">
    <!-- END TEMP -->
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
        fetch('http://localhost:8000/images/images', {
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
