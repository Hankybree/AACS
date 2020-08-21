<template>
  <div class="content">
    <div>FEED</div>
    <div class="image-container">
      <img class="image" src="../../assets/logo.png" alt />
      <div class="author">Frank666</div>
      <div class="commentlikes-container">
        <div class="likes">
          <span>69 spocks</span>
          <button class="likebutton"> <font-awesome-icon :icon="['fas', 'hand-spock']" /></button>
        </div>
        <form action>
          <input type="text" placeholder="comment..." />
        </form>

        <div class="comments">
          <div class="comment-count">view all 69 comments</div>
          <div class="comment-container">
            <div class="user">Frank</div>
            <div class="comment">This is a pretty photo!</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // created() {
  //   fetch('http://localhost:8000/fileuploads/')
  //     .then(response => response.json())
  //     .then(result => {
  //       this.images = result
  //     })
  // },
  // data() {
  //   return {
  //     images: []
  //   }
  // },
  name: "Feed",
};
</script>

<style scoped>
.image-container {
  width: 100%;
  max-width: 50em;
  background-color: darkgrey;
  display: inline-block;
  font-family: Montserrat, sans-serif;
}

.image {
  max-width: 20em;

}

.commentlikes-container {
  background-color: #0a0a27;
}

.likes {
  text-align: start;
  margin-left: 1em;
  font-weight: 600;
}

/** --------------BUTTONS----------- */
.likebutton {
  font-size: 2em;
  background-color: transparent;
  border-style: none;
  color: white;
}

.likebutton:hover {
  color: orange;
}
</style>
