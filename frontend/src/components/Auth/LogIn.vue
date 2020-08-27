<template>
  <div class="content">
    <h1 class="whiteColor">Login</h1>

    <!-- Login components -->
    <div id="login-components">
      <div>
        <label for="login-username" class="whiteColor left-padding">Email</label>
        <font-awesome-icon class="icons" :icon="['fas', 'at']" />
        <input
          type="text"
          id="login-username"
          class="login-input"
          placeholder="email"
          v-model="emailUsername"
        />
      </div>

      <div>
        <label for="login-password" class="whiteColor left-padding">Password</label>
        <font-awesome-icon class="icons" :icon="['fas', 'lock']" />
        <input
          type="password"
          id="login-password"
          class="login-input"
          placeholder="password"
          v-model="password"
        />
      </div>

      <!-- Login & Forgot password buttons -->
      <div id="button-components">
        <input
          class="forgot-password-button whiteColor"
          type="button"
          value="Forgot password?"
          @click="resetPasswordButtonTapped"
        />
        <!-- <input class="login-button" type="button" value="Login" @click="loginButtonTapped" /> -->
        <button :class="`${emailUsername && password ? 'login-button-valid' : 'login-button'}`" class="login-button" @click="loginButtonTapped"><font-awesome-icon :icon="['fas', 'arrow-circle-right']" /></button>
      </div>
      <p v-if="errorMessage" class="errorMessage">{{ errorMessage }}</p>

      <!-- Register button -->
      <div id="register-components">
        <input
          class="sign-up-button whiteColor"
          type="button"
          value="No account? Sign up"
          @click="signUpButtonTapped"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LogIn",
  data() {
    return {
      emailUsername: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    loginButtonTapped() {
      const credentials = {
        emailUsername: this.emailUsername,
        password: this.password,
      };

      this.axios
        .post("auth/login", credentials)
        .then((res) => {
          let user = res.data.user;
          let token = res.data.token;
          this.$store.dispatch("login", { user, token });
        })
        .catch((err) => {
          console.log(err.response.data);
          this.errorMessage = err.response.data.msg;
        });
    },
    signUpButtonTapped() {
      this.$router.push({ name: "AuthView", params: { page: "signup" } });
    },
    resetPasswordButtonTapped() {
      this.$router.push({ name: "AuthView", params: { page: "forgot" } });
    },
  },
};
</script>

<style scoped>
/* Login components */
#login-components {
  width: 80%;
  margin: auto;
  text-align: left;
  font-family: Montserrat, sans-serif;
}

#login-components label {
  padding-bottom: 0px;
  padding-left: 12px;
  display: block;
  font-size: 0.9em;
}

.icons {
  margin-left: -1em;
  opacity: 0.5;
}

.login-input {
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
/* Button components */
#button-components {
  width: 100%;
  height: 30pt;
}
.login-button {
  width: 40%;
  height: 100%;
  color: white;
  border-radius: 50%;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1.50em;
  background-color: transparent;
  border-style: none;
}

.login-button-valid {
  width: 40%;
  height: 100%;
  color: blue;
  border-radius: 50%;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1.50em;
  background-color: transparent;
  border-style: none;
}

.forgot-password-button {
  width: 60%;
  height: 100%;
  background-color: transparent;
  border: 0px;
  text-align: left;
  font-size: 10pt;
}
/* Register components */
#register-components {
  width: 100%;
}
.sign-up-button {
  width: 100%;
  height: 30pt;
  margin-top: 50pt;
  background-color: transparent;
  border: 0px;
  font-size: 10pt;
}
</style>