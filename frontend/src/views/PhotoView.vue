<template>
  <div class="content">
      <!-- Send image via params and insert everything in here to show comments and likes -->
  <transition name="fade">
         <div class="photoview">
      <div class="image-container">
          <button class="closebutton">X</button>
        <img class="image" src="../assets/logo.png" alt />
        <div class="author">author: Frank666</div>
        <div class="commentlikes-container">
          <div class="likes">
            <span>69 spocks</span>
            <button class="likebutton button"> <font-awesome-icon :icon="['fas', 'hand-spock']" /></button>
            <button class="likebutton button"> <font-awesome-icon :icon="['fas', 'hand-spock']" /></button>
          </div>
          
          <input v-model="message" placeholder="comment..." />
          <button class="sendbutton button" ><font-awesome-icon :icon="['fas', 'paper-plane']" /></button>
          
  
          <div class="comments">
            <button class="show-comment-button button">View all 59 comments</button>
            <button class="show-comment-button button">Hide comments</button>
            <div class="comment-container">
              <div >
                <div class="user"></div>
                <div class="comment"></div>
                <button>Delete comment</button>
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
  name: 'PhotoView'
}
</script>

<style scoped>

.content {
    transition: opacity 0.3s ease;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.photoview {
    margin-top: 10%;
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

.comment-container  {
  text-align: left;
  margin-left: 2em;
  margin-right: 2em;
  padding: 1em;
}

</style>