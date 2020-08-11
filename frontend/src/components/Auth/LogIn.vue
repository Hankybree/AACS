<template>
  <div class="content">
    <h1 class="whiteColor">Login</h1>

    <!-- Login components -->
    <div id="login-components">
      <label for="login-username" class="left-padding whiteColor">Username</label>
      <input type="text" id="login-username" class="login-input" v-model="username" />
      <label for="login-password" class="left-padding whiteColor">Password</label>
      <input type="password" id="login-password" class="login-input" v-model="password" />

      <!-- Login & Forgot password buttons -->
      <div id="button-components">
        <input class="forgot-password-button left-padding whiteColor" type="button" value="Forgot password?" @click="resetPasswordButtonTapped" />
        <input class="login-button" type="button" value="Login" @click="loginButtonTapped"/>
      </div>

      <!-- Register button -->
      <div id="register-components">
        <input class="sign-up-button whiteColor" type="button" value="No account? Sign up" @click="signUpButtonTapped" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LogIn',
  data() {
    return {
      username: "",
      password: "",
    }
  },
  methods: {
    loginButtonTapped(){
      const credentials = { username: this.username, password: this.password }
      console.log(credentials)

      //TODO: Handle login here
    },
    signUpButtonTapped(){
      this.$router.push({ name: "AuthView", params:{ page: "signup" }})
    },
    resetPasswordButtonTapped(){
      this.$router.push({ name: "AuthView", params:{ page: "forgot" }})
    }
  }
}
</script>

<style scoped>
/* Login components */
#login-components{
  width: 80%;
  margin: auto;
  text-align: left;
}
.left-padding{
  padding-left: 10pt;
}
.login-input{
  width: 100%;
  height: 40pt;
  box-sizing: border-box;
  font-size: 15pt;
  margin-bottom: 10pt;
}
/* Button components */
#button-components{
  width: 100%;
  height: 30pt;
}
.login-button{
  width: 40%;
  height: 100%;
  border: 0px;
  background-color: white;
}
.forgot-password-button{
  width: 60%;
  height: 100%;
  background-color: transparent;
  border: 0px;
  text-align: left;
  font-size: 10pt;
}
/* Register components */
#register-components{
  width: 100%;
}
.sign-up-button{
  width: 100%;
  height: 30pt;
  margin-top: 50pt;
  background-color: transparent;
  border: 0px;
  font-size: 10pt;
}
</style>