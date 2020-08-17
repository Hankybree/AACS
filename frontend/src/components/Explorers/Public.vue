<template>
  <div class="content">
    <input type="button" @click="getImages()" />
    <input type="button" @click="reDraw" />
    <div
      v-masonry
      transition-duration="3s"
      item-selector=".item"
      class="masonry-container"
    >
      <div
        v-masonry-tile
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
  //import {VueMasonryPlugin} from '../../node_modules/vue-masonry/src/masonry.plugin';
  import { VueMasonryPlugin } from 'vue-masonry'

  Vue.use(VueMasonryPlugin)
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
      },
      reDraw() {
        this.$redrawVueMasonry('.masonry-container')
      }
    }
  }
</script>

<style scoped>
  .item {
    width: 200px;
  }
  .masonry-container {
    background-color: aliceblue;
    width: 60%;
    margin: 0 auto;
  }
</style>
