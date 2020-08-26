<template>
  <div class="container">
    <!-- Reset password -->
    <div id="reset-password-container">
      <label for="current-pass">Current password</label>
      <input type="password" id="current-pass" class="reset-password-input" v-model="currentPassword"/>

      <label for="new-pass">New password</label>
      <input type="password" id="new-pass" class="reset-password-input" v-model="newPassword"/>

      <label for="repeat-pass">Repeat password</label>
      <input type="password" id="repeat-pass" class="reset-password-input" v-model="repeatPassword"/>

      <div id="button-components">
        <input type="button" value="Change" class="reset-password-button" @click="changePassword"/>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name:"ResetPassword",
  data(){
    return{
      currentPassword: "",
      newPassword: "",
      repeatPassword: ""
    }
  },
  methods:{
    changePassword(){
      const credentials = { oldPass: this.currentPassword, newPassword: this.newPassword, repeatPassword: this.repeatPassword, userId: this.$store.state.user.id }

      this.axios.post("auth/reset/", credentials)
      .then(res => {
        console.log(res.data.msg)
        this.$router.push({ name: "ProfileView", params:{ page: "profileDetails" }})
      })
      .catch(err => {
        console.log(err.response.data.msg)
      })
    }
  }
}
</script>

<style scoped>
#button-components{
  width: 80%;
  height: auto;
  display: flex;
  justify-content: flex-end;
  margin: 10px auto;
}
.container{
  display: flex;
  justify-content: center;
}
#reset-password-container{
  position: absolute;
  top: 100px;
  width: 90%;
}

#reset-password-container label{
  padding-bottom: 5px;
  padding-left: 12.5%;
  display: flex;
  align-self: flex-start;
}
.reset-password-input{
  width: 80%;
  height: 35px;
  border-radius: 10px;
  border: 0;
  padding-left: 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
}
.reset-password-button{
  width: 40%;
  height: 35px;
  border-radius: 10px;
  border: 0;
  box-sizing: border-box;
  margin-bottom: 10px;
}

</style>