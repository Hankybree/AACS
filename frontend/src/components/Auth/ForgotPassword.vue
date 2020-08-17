<template>
  <div class="content">
        
    <!-- Reset password components -->
    <div class="reset-password-components" v-if="!this.token">
      <h1 class="whiteColor">Forgot password</h1>

      <label for="reset-password-email" class="whiteColor">Email</label>
      <input type="text" id="reset-password-email" class="reset-password-input" v-model="email" />

      <!-- Reset password button -->
      <div id="button-components">
        <input class="reset-password-button" type="button" value="Reset password" @click="resetPasswordButtonTapped"/>
      </div>
    </div>

    <!-- Change password components -->
    <div class="reset-password-components"  v-if="this.token">
      <h1 class="whiteColor">Change password</h1>

      <label for="forgot-prev-pass" class="whiteColor">Previous password</label>
      <input type="password" id="forgot-prev-pass" class="reset-password-input" v-model="oldPassword" />
      
      <label for="forgot-new-pass" class="whiteColor">New password</label>
      <input type="password" id="forgot-new-pass" class="reset-password-input" v-model="newPassword" />

      <label for="forgot-repeat-pass" class="whiteColor">Repeat password</label>
      <input type="password" id="forgot-repeat-pass" class="reset-password-input" v-model="repeatPassword" />

      <!-- Change password button -->
      <div id="button-components">
        <input class="reset-password-button" type="button" value="Change password" @click="resetPasswordButtonTapped"/>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ForgotPassword',
  data() {
    return {
      email: "",
      token: "",
      oldPassword: "",
      newPassword: "",
      repeatPassword: ""
    }
  },
  methods: {
    resetPasswordButtonTapped(){
      let url = "http://localhost:8000/"
      var urlPath = ""
      var credentials = {}

      //Check if token is valid
      if(this.token){
          credentials = { oldPassword: this.oldPassword, newPassword: this.newPassword, repeatPassword: this.repeatPassword }
          urlPath = "change-password/"
      }
      else{
        let isValid = this.checkValidation()

        if(isValid){
          credentials = { email: this.email }
          urlPath = "forgot-password/"
        }
      }

      //Send request to server
      this.axios
      .post(url + urlPath, credentials)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })

    },
    checkValidation(){
      let alertMessage = "Please enter a valid email"

      if(this.email.length != 0){
        if(this.email.includes("@") && this.email.includes(".")){
          return true
        }else{
          alert(alertMessage)
        }
      }else{
        alert(alertMessage)
      }
    }
  },
  created(){
    this.token = this.$route.params.token
  }
}
</script>

<style scoped>
/* Sign up components */
.reset-password-components{
  width: 80%;
  margin: auto;
  text-align: left;
}

.reset-password-components label {
  padding-bottom: 5px;
  padding-left: 15px;
  display: block;
}

.reset-password-input{
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  font-size: 12pt;
  margin-bottom: 10pt;
  border-radius: 7px;
  border: 0px;
}

/* Button components */
#button-components{
  width: 100%;
  height: 30pt;
  display: flex;
  justify-content: flex-end;
}
.reset-password-button{
  width: 40%;
  height: 100%;
  border: 0px;
  background-color: white;
  border-radius: 7px;
}

</style>