<template>
  <div class="content">
    <!-- Send image via params and insert everything in here to show comments and likes -->
    <transition name="fade">
      <div class="photoview">
        <div class="image-container">
          <button class="closebutton">X</button>
          <div class="author">{{ this.image.userName }}</div>
          <img
            class="image"
            :src="imageBaseUrl + this.image.imageId"
            alt="hej"
          />

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
                v-if="!commentsVisible"
                @click="showComments()"
                class="show-comment-button button"
              >
                View all {{ image.comments.length }} comments
              </button>
              <button
                v-else
                @click="showComments()"
                class="show-comment-button button"
              >
                Hide comments
              </button>
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
    width: 95%;
    max-width: 30em;
    background-color: white;
    display: inline-block;
    font-family: Montserrat, sans-serif;
  }

  .image {
    width: 90%;
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

  .closebutton {
    margin-right: 90%;
    text-align: start;
    background-color: transparent;
    color: black;
    font-weight: 700;
    font-size: 1.5rem;
    text-transform: uppercase;
    border-style: none;
    cursor: pointer;
  }

  .comment-container {
    text-align: left;
    margin-left: 2em;
    margin-right: 2em;
    padding: 1em;
  }
</style>
