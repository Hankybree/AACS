<template>
  <div class="content">
    <div class="masonry-container-div">
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
          <img
            class="image"
            :src="image.previewURL"
            alt="no image"
            @click="getImage(index)"
          />
        </div>
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
        imageId: 0,
        gutter: 10,
        showImg: false
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
            // console.log(result)
            this.images = result.hits
          })
      },
      getImage(index) {
        this.imageId = this.images[index].id
        console.log(this.imageId)
        if (this.showImg === false) {
          this.showImg = true
        } else {
          this.showImg = false
        }
        console.log(this.showImg)
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
    background-color: green;
  }
  /* .image {
    width: 20vw;
  } */
  .masonry-container {
    margin: 0 auto;
    margin-left: 6%;
    margin-top: 2%;
  }
  .masonry-container-div {
    width: 80%;
    height: 100%;
    display: inline-block;
    margin: 5px;
    padding: 5px;
    border: chocolate solid 5px;
  }
</style>
