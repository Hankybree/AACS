<template>
  <div class="content">
      <div :key="image.imageUserId" v-for="image in $store.state.images">
        <img :src="image.imagePath" alt="Ingen bild">
      </div>
  </div>
</template>

<script>
export default {
  // created() {
  //   fetch('http://localhost:8000/fileuploads/')
  //     .then(response => response.json())
  //     .then(result => {
  //       this.images = result
  //     })
  // },
  // data() {
  //   return {
  //     images: []
  //   }
  // },
  name: 'TestImages'
}
</script>

<style scoped>

</style>
