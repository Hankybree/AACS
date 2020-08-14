<template>
  <div class="content">
    <input type="button" @click="getImages()" />
    <div
      masonry="containerId"
      transition-duration="0.3s"
      item-selector=".item"
      class="grid"
      :key="index"
      v-for="(image, index) in images"
    >
      <div masonry-tile class="grid-item">
        <img :src="image.previewURL" alt="no image" />
      </div>
    </div>
  </div>
</template>

<script>
  // import masonry from 'masonry-layout '
  export default {
    // Created() {
    //   this.getImages()
    // },
    name: 'Public',
    data() {
      return {
        images: []
      }
    },
    methods: {
      getImages() {
        const apiKey = '4893035-50117f6a495574786f78b773f'
        const url = 'https://pixabay.com/api/?key='

        fetch(url + apiKey + '&q=yellow+flowers&image_type=photo', {
          // headers: { 'x-api-key': '4893035-50117f6a495574786f78b773f' }
        })
          .then((response) => response.json())
          .then((result) => {
            console.log(result)
            this.images = result.hits
          })
      }
    }
  }
</script>

<style scoped>
  .grid-item {
    float: left;
    width: 80px;
    height: 60px;
    border: 2px solid hsla(0, 0%, 0%, 0.5);
  }
</style>
