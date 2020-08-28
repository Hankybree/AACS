<template>
  <div class="content">
    <!-- Profile Interface -->
    <div class="profile-interface">
      <!-- Profile Image -->
      <div class="profile-image-container">
        <div class="profile-image"></div>
      </div>
      <!-- Profile details -->
      <div class="profile-details">
        <p class="profile-text"><font-awesome-icon class="icons" :icon="['far', 'user']" />{{this.$store.state.user.username}}</p>
        <p class="profile-text"><font-awesome-icon class="icons" :icon="['fas', 'at']" />{{this.$store.state.user.email}}</p>
        <p class="profile-text "><font-awesome-icon class="icons" :icon="['far', 'images']" /> {{countedImages}}</p>
      </div>
    </div>
    <!-- Settings -->
    <div class="settings-container">
      <button class="settings-button white" @click="changePassword">Change password</button>
      <button class="settings-button red" @click="logout">Logout</button>
    </div>
    <div class="whiteLine"></div>

    <!-- Bläddra bland privata bilder -->
    <div class="image-grid-wrapper">
      <div class="column">
        <div class="grid-image" v-for="(result, index) in images" :key="index">
          <img :src="imageBaseUrl + images[index].imageId" alt="Image" class="image" />
        </div>

      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'ProfileDetails',
  data(){
    return{
      countedImages: 0,
      images: [],
      imageBaseUrl: 'https://picnet.aviliax.com/api/fileuploads/uploadedfiles/'
    }
  },
  created(){
    this.getImages()
  },
  methods:{
    getImages(){
      const credentials = { userId: this.$store.state.user.id }

      this.axios.post("images/getImagesFromUser", credentials)
      .then(res => {
        this.images = res.data.images
        this.countedImages = this.images.length
      })
      .catch(err => {
        console.log(err.response.data.message)
      })
    },
    changePassword(){
      this.$router.push({ name: "ProfileView", params:{ page: "resetPassword" }})
    },
    logout(){
      //Handle logout here
      this.$store.dispatch("logout")

      //Push back to AuthView
      this.$router.push({ name: "AuthView", params:{ page: "login" }})
    }
  },
  computed: {
    page() {
      return this.$route.params.page
    }
  }
}
</script>

<style scoped>
.column{
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  justify-content: center;
}
.grid-image{
  width: 32%;
  max-width: 10em;
  height: 100pt;
  margin: 1px;
  border: 1px solid black;
}
.image{
  width: 100%;
  height: 100%;
}
.image-grid-wrapper{
  margin: 10px auto;
}
.icons{
  margin-right: 0.5em;
  color: white;
}
.profile-details{
  margin-top: 0.5em;
  width: 80%;
  display: flex; 
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
}
.profile-image{
  width: 50px;
  height: 50px;
  background-image: url('../assets/logo.png');
  background-size: contain;
  background-repeat: no-repeat;
}
.profile-image-container{
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.profile-interface{
  width: 100%;
  height: 50pt;
  background-color:transparent;
  display: flex;
  flex-direction: row;
}
.profile-text{
  margin: 0;
  padding-left: 10px;
  padding-right: 10px;
  color: white;
}
.red{
  background-color: tomato;
  color: white;
}
.settings-button{
  width: 80%;
  border-radius: 10px;
  height: 30pt;
  margin-top: 5pt;
  border: 0px;
  font-weight: 600;
}
.settings-container{
  width: 100%;
  padding-bottom: 10px;
  padding-top: 10px;
}
.uploads{
  display: flex;
  font-size: 12px;
  padding-left: 10px;
  padding-right: 10px;
}
.white{
  background-color: white;
  color: #1a1818;
}
.whiteLine{
  background-color: white;
  width: 80%;
  height: 1px;
  margin: 10px auto;
}

</style>