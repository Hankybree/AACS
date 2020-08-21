<template>
  <div class="content">
    <div>FEED</div>
    <div class="image-container">
      <img class="image" src="../../assets/logo.png" alt />
      <div class="author">author: Frank666</div>
      <div class="commentlikes-container">
        <div class="likes">
          <span>69 spocks</span>
          <button class="likebutton button"> <font-awesome-icon :icon="['fas', 'hand-spock']" /></button>
        </div>
        <form action>
          <input type="text" placeholder="comment..." />
          <button class="sendbutton button"><font-awesome-icon :icon="['fas', 'paper-plane']" /></button>
        </form>

        <div class="comments">
          <button @click="showComments" class="show-comment-button button">{{showCommentsbtnmsg}}</button>
          <div v-if="commentsVisible" class="comment-container">
            <div class="user">Frank:</div>
            <div class="comment">This is a pretty photo!</div>
            <hr/>
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
      showCommentsbtnmsg: 'view all 69 comments'
    }
  },
  methods: {
    showComments() {
      this.commentsVisible = !this.commentsVisible
      if(this.commentsVisible) {
        this.showCommentsbtnmsg = 'hide comments'
      } else {
        this.showCommentsbtnmsg = 'view all 69 comments' 
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
