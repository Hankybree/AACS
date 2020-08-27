<template>
  <div class="content">
        
    <!-- Reset password components -->
    <div class="reset-password-components" v-if="!hasToken">
   
        <p>
      Forgot password?
      <br />
       get a new one to keep sharing pictures with your <b>friends</b>.
    </p>

      <div><label for="reset-password-email" class="whiteColor">Email</label>
      <font-awesome-icon class="icons" :icon="['fas', 'at']" />
      <input type="text" placeholder="email" id="reset-password-email" class="reset-password-input" v-model="email" /></div>

      <!-- Reset password button -->
      <div id="button-components">
        <input class="reset-password-button" type="button" value="Reset password" @click="forgot"/>
      </div>
    </div>

    <!-- Change password components -->
    <div class="reset-password-components"  v-if="hasToken">
      <h1 class="whiteColor">Change password</h1>
      
      <label for="forgot-new-pass" class="whiteColor">New password</label>
      <input type="password" id="forgot-new-pass" class="reset-password-input" v-model="newPassword" />

      <label for="forgot-repeat-pass" class="whiteColor">Repeat password</label>
      <input type="password" id="forgot-repeat-pass" class="reset-password-input" v-model="repeatPassword" />

      <!-- Change password button -->
      <div id="button-components">
        <input class="reset-password-button" type="button" value="Change password" @click="createNewPass"/>
      </div>
    </div>

    <p>{{errorMessage}}</p>
    <p>{{successMessage}}</p>
  </div>
</template>

<script>
export default {
  name: 'ForgotPassword',
  data() {
    return {
      email: "",
      repeatPassword: '',
      newPassword: '',
      errorMessage: "",
      successMessage: "",
    }
  },
  computed: {
    hasToken() {
      if (this.$route.params.token) {
        return true
      }
      return false
    }
  },
  methods: {
    forgot() {
      this.errorMessage = null;
   

      this.axios.post('auth/forgot', {
        email: this.email,
      })
      .then(res => {
        this.successMessage = res.data.msg
      })
      .catch(err => {
        console.log(err.response);
        this.errorMessage = err.response.data.msg
      })
     
    },
    createNewPass() {
      this.errorMessage = null;
  

      this.axios.post('auth/forgot', {
        token: this.$route.params.token,
        changingPass: true,
        repeatPassword: this.repeatPassword,
        newPassword: this.newPassword
      })
      .then(res => {
        this.successMessage = res.data.msg
        setTimeout(() => {
          this.$router.push({ name: "AuthView", params: { page: 'login' } })
        }, 1500);
      })
      .catch(err => {
        console.log(err.response);
        this.errorMessage = err.response.data.msg
      })
    },
  },

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
  padding-bottom: 0px;
  padding-left: 12px;
  display: block;
  font-size: 0.9em;
}

.reset-password-input{
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