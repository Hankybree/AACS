<template>
  <div class="content">
    <!-- Söka efter publika bilder -->
    <Public />
    
  </div>
</template>

<script>
  import Public from '../components/Explorers/Public'

  export default {
    name: 'ExplorerView',
    components: { Public },
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
