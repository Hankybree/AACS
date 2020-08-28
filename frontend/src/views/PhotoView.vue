<template>
  <div class="content">
    <!-- Send image via params and insert everything in here to show comments and likes -->
    <transition name="fade">
      <div class="photoview">
        <div class="image-container">
          <div class="author">{{ this.image.userName }}</div>
          <img
            class="image"
            :src="imageBaseUrl + this.image.imageId"
            alt="hej"
          />

          <div class="commentlikes-container">
            <span class="likes">
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
              <button
                
                @click="showComments()"
                class="show-comment-button button"
              >
               <font-awesome-icon :icon="['far', 'comment-dots']" />
              </button>
            </span>

            <div class="comments">
              
              
              <div
                v-if="commentsVisible"
                class="comment-container"
              >
                <input
                  :id="'comment-input'"
                  type="text"
                  placeholder="comment..."
                />
                
                <button
                  class="sendbutton button"
                  @click="sendComment(image.imageId)"
                >
                  <font-awesome-icon :icon="['fas', 'paper-plane']" />
                </button>

                <div :key="index" v-for="(comment, index) in image.comments">
                  <div class="user">{{ comment.commentUserId }}</div>
                  <div class="comment">{{ comment.commentMessage }}</div>
                  <button
                    @click="
                      $store.dispatch('deleteComment', {
                        imageId: image.imageId,
                        commentId: comment.commentId
                      })
                    "
                  >
                    Delete comment
                  </button>
                  <div>{{ comment.commentCreationTime }}</div>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'PhotoView',
    beforeCreate() {
      this.$store.dispatch('connect')
    },
    created() {
      console.log(this.$route.params.photoid)
      this.image = this.$store.state.images.find(
        (image) => image.imageId === this.$route.params.photoid
      )
      console.log('Hej ' + JSON.stringify(this.image))
    },
    beforeDestroy() {
      this.$store.dispatch('disconnect')
    },
    data() {
      return {
        imageBaseUrl: 'https://picnet.aviliax.com/api/fileuploads/uploadedfiles/',
        image: {},
        commentsVisible: false,
        imageId: this.$route.params.photoid
      }
    },
    computed: {
      images: {
        get() {
          return this.$store.state.images
        }
      }
    },
    methods: {
      showComments() {
        if (this.commentsVisible) {
          this.commentsVisible = false
        } else {
          this.commentsVisible = true
        }
      },
      sendComment(imageId) {
      this.$store.dispatch('comment', { imageId: imageId, message: document.querySelector('#comment-input').value })
      document.querySelector('#comment-input').value = ''
    }
    }
  }
</script>

<style scoped>
  .content {
    transition: opacity 0.3s ease;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .photoview {
    margin-top: 10%;
    margin-bottom: 10%;
    width: 100%;
    background-color: transparent;
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

  .commentlikes-container {
   color: #333;
   display: flex;
   margin-left: -1em;
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
    color: grey;
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

</style>
