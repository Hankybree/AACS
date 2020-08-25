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
          <!-- <div v-if="image.userName == userName"> -->
          <img
            class="image"
            :src="imageBaseUrl + image.imageId"
            alt="no image"
            @click="getImage(index)"
          />
          <!-- </div> -->
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
        imageData: {},
        showImg: false,
        currentPage: 0,
        imageBaseUrl: 'http://localhost:8000/api/fileuploads/uploadedfiles/'
        // userName: 'mybigpic'
      }
    },
    methods: {
      getImages() {
        const apiKey = '4893035-50117f6a495574786f78b773f'
        const url = 'https://pixabay.com/api/?key='

        this.axios
          .post('images/grid', {
            currentPage: this.currentPage
          })
          .then((result) => {
            console.log(result)

            this.images = result.data
          })
      },
      getImage(index) {
        this.imageId = this.images[index].imageId
        this.imageData = this.images[index]
        console.log(this.imageId)
        if (this.showImg === false) {
          this.showImg = true
        } else {
          this.showImg = false
        }
        // @click="
        this.$router.push({
          name: 'PhotoView',
          params: { photoid: this.imageId },
          query: { image: this.imageData }
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
  .image {
    max-width: 150px;
  }
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
  }
</style>
