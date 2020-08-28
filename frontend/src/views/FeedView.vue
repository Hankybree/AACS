<template>
  <div class="content">
    <div :key="index" v-for="(image, index) in images">
      <div class="image-container">
        <div class="author">{{ image.username }}</div>
        <img class="image" :src="imageBaseUrl + image.imageId" alt />
<<<<<<< HEAD
        <div class="author">Author: {{ image.userName }}</div>
        
=======
>>>>>>> master
        <div class="commentlikes-container">
          <div class="spockCommentBox">
            <div style="display:flex">
              <div class="likes">
                <span>{{ image.likes.length }}</span>
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
              <font-awesome-icon class="commentIcon" @click="showComments(index)" :icon="['far', 'comment-dots']" />
            </div>
            <div class="date">{{ prettyDate(image.creationTime) }}</div>

          </div>

      

          <div class="comments">
            <div v-if="visibleArray.includes(index)" class="comment-container">

              <input :id="'comment-input' + index" type="text" placeholder="comment..." />
              <!-- <button class="sendbutton button" @click="$store.dispatch('comment', image.imageId)"> -->
                <button class="sendbutton button" @click="sendComment(index, image.imageId)">
              <font-awesome-icon :icon="['fas', 'paper-plane']" />
              </button>
              
              <div class="commentWrapper" :key="index" v-for="(comment, index) in image.comments">
                <div class="user">{{ comment.commentUser }}</div>
                <div class="comment">{{ comment.commentMessage }}</div>
                <div class="delete-button-wrapper">
                  <button
                    class="delete"
                    @click="$store.dispatch('deleteComment', {imageId: image.imageId, commentId: comment.commentId})"
                  >
                    <font-awesome-icon :icon="['far', 'trash-alt']" />
                  </button>
                </div>
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
      imageBaseUrl: 'https://picnet.aviliax.com/api/fileuploads/uploadedfiles/',
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
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
    reverseArray(arr) {

    },
    getImages() {
      this.axios
        .post("images/feed", {
          currentPage: this.currentPage,
        })
        .then((result) => {
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
    prettyDate(date) {
      const dateobj = new Date(date)
      return  dateobj.getDate()+' '+this.monthNames[dateobj.getMonth()]+' '+dateobj.getFullYear()
    }
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
  padding: 15px;
  margin-top: 15px;
  width: 85%;
  max-width: 30em;
  background-color: #f5f5f5;
  display: inline-block;
  font-family: Montserrat, sans-serif;
  border-radius: 8px;
  overflow: hidden;
}

.image {
  width: 100%;
  max-width: 30em;
}

.spockCommentBox {
  display: flex;
  justify-content: space-between;
}

.date {
  position: relative;
  top: 15px;
  font-size: 11pt;
}

.spockCommentBox .commentIcon {
  font-size: 16pt;
  margin: 5px;
}

.commentWrapper {
  display: flex;
  margin-top: 10px;
}

.commentWrapper .user {
  font-weight: bold;
  color: #333;
  margin-right: 5px;
}

.comment-container {
  text-align: left;
  padding: 1em;
}


.likes {
  text-align: start;
  font-weight: 600;
}

.author {
  text-align: start;
  font-weight: 500;
  font-size: 13pt;
  margin-bottom: 5px;
}

/** --------------BUTTONS----------- */
.button {
  font-size: 1.5em;
  background-color: transparent;
  border-style: none;
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

.delete {
  border-style: none;
  background-color: transparent;
  font-size: 1.2em;
}


.delete-button-wrapper {
  text-align: right;
}
</style>
