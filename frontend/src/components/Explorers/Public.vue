<template>
  <div class="content">
    <input type="button" @click="reDraw()" />
    <div
      v-masonry
      transition-duration="1s"
      item-selector=".item"
      gutter="7"
      class="masonry-container"
    >
      <div
        v-masonry-tile
        column-width="10px"
        class="item"
        :key="index"
        v-for="(image, index) in images"
      >
        <img :src="image.previewURL" alt="no image" />
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

  import { VueMasonryPlugin } from 'vue-masonry'

  Vue.use(VueMasonryPlugin)

  export default {
    created() {
      this.getImages()
    },
    name: 'Public',
    data() {
      return {
        images: [],
        gutter: 10
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
      },
      reDraw() {
        this.$redrawVueMasonry('.grid')
      }
    }
  }
</script>

<style scoped>
  /* item = image container (inte själva bilden alltså) */
  .item {
  }
  .masonry-container {
    margin: 0 auto;
  }
</style>
