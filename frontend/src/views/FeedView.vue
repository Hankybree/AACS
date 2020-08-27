<template>
  <div class="content">
    <div>FEED</div>
    <div :key="index" v-for="(image, index) in images">
      <div class="image-container">
        <img class="image" :src="imageBaseUrl + image.imageId" alt />
        <div class="author">Author: {{ image.userName }}</div>
        <div class="date">Created: {{ image.creationTime }}</div>
        <div class="commentlikes-container">
          <div class="likes">
            <span>{{ image.likes.length }} spocks</span>
            <button
              v-if="!image.likes.includes($store.state.user.id)"
              class="likebutton button"
              @click="$store.dispatch('like', image.imageId)"
            >
              <font-awesome-icon :icon="['fas', 'hand-spock']" />
            </button>
            <button
              v-else
              class="likebutton-pressed button"
              @click="$store.dispatch('like', image.imageId)"
            >
              <font-awesome-icon :icon="['fas', 'hand-spock']" />
            </button>
          </div>

          <div class="comments">
            <button
              v-if="!visibleArray.includes(index)"
              @click="showComments(index)"
              class="show-comment-button button"
            >View all {{image.comments.length}} comments</button>
            <button v-else @click="showComments(index)" class="show-comment-button button">Hide comments</button>
            <div v-if="visibleArray.includes(index)" class="comment-container">

              <input :id="'comment-input' + index" type="text" placeholder="comment..." />
              <!-- <button class="sendbutton button" @click="$store.dispatch('comment', image.imageId)"> -->
                <button class="sendbutton button" @click="sendComment(index, image.imageId)">
              <font-awesome-icon :icon="['fas', 'paper-plane']" />
              </button>
              
              <div :key="index" v-for="(comment, index) in image.comments">
                <div class="user">{{ comment.commentUserId }}</div>
                <div class="comment">{{ comment.commentMessage }}</div>
                <button @click="$store.dispatch('deleteComment', {imageId: image.imageId, commentId: comment.commentId})">Delete comment</button>
                <div>{{ comment.commentCreationTime }}</div>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    window.addEventListener("scroll", () => {
      this.handleScroll();
    });
  },
  created() {
    this.getImages();
  },
  mounted() {
    this.$store.dispatch("connect");
  },
  beforeDestroy() {
    this.$store.dispatch('disconnect')
  },
  data() {
    return {
      visibleArray: [],
      loading: false,
      currentPage: 0,
      imageBaseUrl: 'https://picnet.aviliax.com/api/fileuploads/uploadedfiles/'
    };
  },
  methods: {
    sendComment(index, imageId) {
      this.$store.dispatch('comment', { imageId: imageId, message: document.querySelector('#comment-input' + index).value })
      document.querySelector('#comment-input' + index).value = ''
    },
    showComments(index) {
      if (!this.visibleArray.includes(index)) {
        this.visibleArray.push(index)
      } else {
        this.visibleArray.splice(this.visibleArray.indexOf(index), 1)
      }
    },
    getImages() {
      this.axios
        .post("images/feed", {
          currentPage: this.currentPage,
        })
        .then((result) => {
          console.log(result)
          if (this.currentPage === 0) {
            this.$store.commit("setImages", result.data);
          } else {
            this.$store.commit("appendImages", result.data);
          }
          this.loading = false;
        });
    },
    handleScroll() {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        !this.loading
      ) {
        this.loading = true;
        this.currentPage++;
        this.getImages();
      }
    },
  },
  computed: {
    images: {
      get() {
        return this.$store.state.images;
      },
      set(newImages) {
        this.$store.commit("setImages", newImages);
      },
    },
    message: {
      get() {
        return this.$store.state.message;
      },
      set(newMessage) {
        this.$store.commit("setMessage", newMessage);
      },
    },
  },
  name: "Feed",
};
</script>

<style scoped>
hr {
  opacity: 0.1;
}

.image-container {
  width: 95%;
  max-width: 30em;
  background-color: teal;
  display: inline-block;
  font-family: Montserrat, sans-serif;
}

.image {
  width: 95%;
  max-width: 30em;
}

.commentlikes-container {
  background-color: #0a0a27;
}

.likes {
  text-align: start;
  margin-left: 1em;
  font-weight: 600;
}

.author {
  text-align: start;
  margin-left: 1em;
}

/** --------------BUTTONS----------- */
.button {
  font-size: 1.5em;
  background-color: transparent;
  border-style: none;
  color: white;
  cursor: pointer;
}
.likebutton-pressed {
  color: orange;
}
.likebutton:hover {
  color: orange;
}

.sendbutton:hover {
  color: tomato;
}

.show-comment-button {
  font-size: 1.3em;
}

.comment-container {
  text-align: left;
  margin-left: 2em;
  margin-right: 2em;
  padding: 1em;
}
</style>
