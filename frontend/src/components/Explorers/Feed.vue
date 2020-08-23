<template>
  <div class="content">
    <div>FEED</div>
    <div :key="index" v-for="(image, index) in images">
      <div class="image-container">
        <img class="image" :src="image.imagePath" alt />
        <div class="author">author: Frank666</div>
        <div class="commentlikes-container">
          <div class="likes">
            <span>{{ image.likes.length }} spocks</span>
            <button v-if="!image.likes.includes($store.state.user.id)" class="likebutton button" @click="$store.dispatch('like', image.imageId)"> <font-awesome-icon :icon="['fas', 'hand-spock']" /></button>
            <button v-else class="likebutton-pressed button" @click="$store.dispatch('like', image.imageId)"> <font-awesome-icon :icon="['fas', 'hand-spock']" /></button>
          </div>
          
          <input v-model="message" placeholder="comment..." />
          <button class="sendbutton button" @click="$store.dispatch('comment', image.imageId)"><font-awesome-icon :icon="['fas', 'paper-plane']" /></button>
          
  
          <div class="comments">
            <button v-if="!commentsVisible" @click="showComments" class="show-comment-button button">View all {{image.comments.length}} comments</button>
            <button v-else @click="showComments" class="show-comment-button button">Hide comments</button>
            <div v-if="commentsVisible" class="comment-container">
              <div :key="index" v-for="(comment, index) in image.comments">
                <div class="user">{{ comment.commentUserId }}</div>
                <div class="comment">{{ comment.commentMessage }}</div>
                <button @click="$store.dispatch('deleteComment', {imageId: image.imageId, commentId: comment.commentId})">Delete comment</button>
                <hr/>
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
  data() {
    return {
      commentsVisible: false,
      test: 'test'
    }
  },
  methods: {
    showComments() {
      this.commentsVisible = !this.commentsVisible
    }
  },
  computed: {
    images: {
        get() {
            return this.$store.state.images
        },
        set(newImages) {
            this.$store.commit('setImages', newImages)
        }
    },
    message: {
        get() {
            return this.$store.state.message
        },
        set(newMessage) {
            this.$store.commit('setMessage', newMessage)
        }
    }
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

.comment-container  {
  text-align: left;
  margin-left: 2em;
  margin-right: 2em;
  padding: 1em;
}
</style>
