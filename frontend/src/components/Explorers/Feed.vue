<template>
  <div class="content">
      <div>FEED</div>
    <div class="image-container">
        <img src="../../assets/logo.png" alt="">
        <div class="commentlikes-container">comments likes
            <button>likebutton</button>
            <form action="">
                <input type="text" placeholder="comment...">
            </form>
            <div class="comments">
                <div class="comment-count">69 comments</div>
                <div class="comment-container">
                    <div class="user"></div>
                    <div class="comment"></div>
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
  name: 'Feed'
}
</script>

<style scoped>

</style>
