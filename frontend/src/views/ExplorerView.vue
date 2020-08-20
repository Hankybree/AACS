<template>
  <div class="content">
    <!-- Söka efter publika bilder -->
    <Feed v-if="showFeed" />
    <Public v-else />

    <div class="imagedisplay-buttons-container">
      <span>
        <button class="buttons feedbutton" @click="toggleFeed">FEED</button>
        <button class="buttons" @click="toggleGrid">Masonry</button>
      </span>
    </div>
    <!-- TEMP -->
    <!-- <router-link :to="{ name: 'AuthView', params: { page: 'login' }}"><span class="whiteColor">Login</span></router-link> -->
  </div>
</template>

<script>
import Feed from "../components/Explorers/Feed";
import Public from "../components/Explorers/Public";

export default {
  name: "ExplorerView",
  components: { Feed, Public },
  data() {
    return {
      showFeed: false,
    };
  },
  methods: {
    toggleFeed() {
      this.showFeed = true;
    },
    toggleGrid() {
      this.showFeed = false;
    },
  },
};
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
