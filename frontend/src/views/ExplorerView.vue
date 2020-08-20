<template>
  <div class="content">
      <!-- Söka efter publika bilder -->
      <Feed v-if="showFeed"/>
      <Public v-else/>

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
  name: 'ExplorerView',
  components: {Feed, Public},
  data() {
    return {
      showFeed: false
    }
  },
  methods: {
    toggleFeed() {
      this.showFeed = true
    },
    toggleGrid() {
      this.showFeed = false
    }
  }
}
</script>

<style scoped>

</style>
