<template>
  <div class="content">
    <p>
      Register to create
      <br />
      a <b>new account</b>.
    </p>

    <!-- Sign up components -->
    <div id="register-components">
      <div>
        <label for="sign-up-username" class="whiteColor">Username</label>
        <font-awesome-icon class="icons" :icon="['far', 'user']" />
        <input type="text" placeholder="username" id="sign-up-username" class="sign-up-input" v-model="username" />
      </div>

      <div>
        <label for="sign-up-email" class="whiteColor">Email</label>
      <font-awesome-icon class="icons" :icon="['fas', 'at']" />
      <input type="text" placeholder="email" id="sign-up-email" class="sign-up-input" v-model="email" />
      </div>

      <div><label for="sign-up-password" class="whiteColor">Password</label>
      <font-awesome-icon class="icons" :icon="['fas', 'lock']" />
      <input type="password" placeholder="password" id="sign-up-password" class="sign-up-input" v-model="password" /></div>

     <div> <label for="repeat-sign-up-password" class="whiteColor">Repeat password</label>
      <font-awesome-icon class="icons" :icon="['fas', 'lock']" />
      <input
        type="password"
        placeholder="password"
        id="repeat-sign-up-password"
        class="sign-up-input"
        v-model="repeatPassword"
      /></div>

      <!-- Sign up button -->
      <div id="button-components">
        <input class="sign-up-button" type="button" value="Sign up" @click="signUpButtonTapped" />
      </div>

      <p v-if="successMessage" class="successMessage">{{ successMessage }}</p>
      <p v-if="errorMessage" class="errorMessage">{{ errorMessage }}</p>

      <!-- Login button -->
      <div id="login-components">
        <input
          class="login-button whiteColor"
          type="button"
          value="Already have an account? Sign in"
          @click="loginButtonTapped"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    loginButtonTapped() {
      this.$router.push({ name: "AuthView", params: { page: "login" } });
    },
    signUpButtonTapped(){
        const credentials = { username: this.username, email: this.email, password: this.password, repeatPassword: this.repeatPassword }
        console.log(credentials)

        this.axios
        .post("auth/signup/", credentials)
        .then((res) => {
          this.successMessage = res.data.msg;
        })
        .catch((err) => {
          this.errorMessage = err.response.data.msg;
        });
    },
  },
};
</script>

<style scoped>
/* Sign up components */
#register-components {
  width: 80%;
  margin: auto;
  text-align: left;
}

#register-components label {
   padding-bottom: 0px;
  padding-left: 12px;
  display: block;
  font-size: 0.9em;
}

.sign-up-input {
  display: inline-block;
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  font-size: 12pt;
  margin-bottom: 10pt;
  border: 0;
  outline: 0;
  background: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.253);
  color: white;
}

#register-components label {
  padding-bottom: 5px;
  display: block;
}

/* Button components */
#button-components {
  width: 100%;
  height: 30pt;
  display: flex;
  justify-content: flex-end;
}

p {
  margin-top: 1.5em;
  margin-bottom: 3em;
  font-family: Montserrat, sans-serif;
  font-size: 1.2em;
}

.icons {
  margin-left: -1em;
  opacity: 0.5;
}

.sign-up-button {
  width: 40%;
  height: 100%;
  border: 0px;
  background-color: white;
  border-radius: 7px;
}

/* Register components */
#login-components {
  width: 100%;
}
.login-button {
  width: 100%;
  height: 30pt;
  margin-top: 30pt;
  background-color: transparent;
  border: 0px;
  font-size: 10pt;
}
</style>