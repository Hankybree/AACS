<template>
  <div class="content">
    <h1 class="whiteColor">Sign up</h1>

    <!-- Sign up components -->
    <div id="register-components">
      <label for="sign-up-username" class="left-padding whiteColor">Username</label>
      <input type="text" id="sign-up-username" class="sign-up-input" v-model="username" />

      <label for="sign-up-email" class="left-padding whiteColor">Email</label>
      <input type="text" id="sign-up-email" class="sign-up-input" v-model="email" />

      <label for="sign-up-password" class="left-padding whiteColor">Password</label>
      <input type="password" id="sign-up-password" class="sign-up-input" v-model="password" />

      <label for="repeat-sign-up-password" class="left-padding whiteColor">Repeat password</label>
      <input type="password" id="repeat-sign-up-password" class="sign-up-input" v-model="repeatPassword" />

      <!-- Sign up button -->
      <div id="button-components">
        <input class="sign-up-button" type="button" value="Sign up" @click="signUpButtonTapped"/>
      </div>

      <p class="response-success-message">{{ successMessage }}</p>
      <p class="response-error-message">{{ errorMessage }}</p>

      <!-- Login button -->
      <div id="login-components">
        <input class="login-button whiteColor" type="button" value="Already have an account? Sign up" @click="loginButtonTapped" />
      </div>

  
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data() {
    return {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
      errorMessage: "",
      successMessage: ""
    }
  },
  methods: {
    loginButtonTapped(){
      this.$router.push({ name: "AuthView", params:{ page: "login" }})
    },
    signUpButtonTapped(){
        let url = "http://localhost:8000/"

        const credentials = { username: this.username, email: this.email, password: this.password, repeatPassword: this.repeatPassword }
        console.log(credentials)

        this.axios
        .post(url + "auth/signup/", credentials)
        .then(res => {
          this.successMessage = res.data.msg
        })
        .catch(err => {
          this.errorMessage = err.response.data.msg
        })
      
    }
  }
}
</script>

<style scoped>
/* Sign up components */
#register-components{
  width: 80%;
  margin: auto;
  text-align: left;
}
.left-padding{
  padding-left: 10pt;
}
.sign-up-input{
  width: 100%;
  height: 40pt;
  box-sizing: border-box;
  font-size: 15pt;
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
.sign-up-button{
  width: 40%;
  height: 100%;
  border: 0px;
  background-color: white;
  border-radius: 7px;
}

/* Register components */
#login-components{
  width: 100%;
}
.login-button{
  width: 100%;
  height: 30pt;
  margin-top: 30pt;
  background-color: transparent;
  border: 0px;
  font-size: 10pt;
}

/* Messages */
.response-error-message{
  color: red;
  text-align: center;
  margin-top: 10pt;
}
.response-success-message{
  color: green;
  text-align: center;
  margin-top: 10pt;
}
</style>