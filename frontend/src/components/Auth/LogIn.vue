<template>
  <div class="content">
    <h1 class="whiteColor">Login</h1>

    <!-- Login components -->
    <div id="login-components">
      <label for="login-username" class="whiteColor left-padding">Email</label>
      <input type="text" id="login-username" class="login-input" v-model="emailUsername" />
      <label for="login-password" class="whiteColor left-padding">Password</label>
      <input type="password" id="login-password" class="login-input" v-model="password" />

      <!-- Login & Forgot password buttons -->
      <div id="button-components">
        <input class="forgot-password-button whiteColor" type="button" value="Forgot password?" @click="resetPasswordButtonTapped" />
        <input class="login-button" type="button" value="Login" @click="loginButtonTapped"/>
      </div>
      <p v-if="errorMessage" class="errorMessage">{{ errorMessage }}</p>

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
      emailUsername: "",
      password: "",
      errorMessage: ""
    }
  },
  methods: {
    loginButtonTapped(){
      const credentials = { emailUsername: this.emailUsername, password: this.password }
      
      this.axios.post('auth/login', credentials)
      .then(res => {
        let user = res.data.user
        let token = res.data.token
        this.$store.dispatch('login', { user, token })
      })
      .catch(err => {
        this.errorMessage = err.response.data.msg
      })
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

#login-components label {
  padding-bottom: 5px;
  padding-left: 15px;
  display: block;
}

.login-input{
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
}
.login-button{
  width: 40%;
  height: 100%;
  border: 0px;
  background-color: white;
  border-radius: 7px;
  
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