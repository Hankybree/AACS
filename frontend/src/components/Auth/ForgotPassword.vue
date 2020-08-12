<template>
  <div class="content">
    <h1 class="whiteColor">Forgot password</h1>
    
    <!-- Reset password components -->
    <div id="reset-password-components">

      <label for="reset-password-email" class="left-padding whiteColor">Email</label>
      <input type="text" id="reset-password-email" class="reset-password-input" v-model="email" />

      <!-- Reset password button -->
      <div id="button-components">
        <input class="reset-password-button" type="button" value="Reset password" @click="resetPasswordButtonTapped"/>
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
    }
  },
  methods: {
    resetPasswordButtonTapped(){
      //TODO: Add logic for fields
      const credentials = { email: this.email }
      console.log(credentials)

      //TODO: Handle signup here
    }
  }
}
</script>

<style scoped>
/* Sign up components */
#reset-password-components{
  width: 80%;
  margin: auto;
  text-align: left;
}
.left-padding{
  padding-left: 10pt;
}
.reset-password-input{
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
.reset-password-button{
  width: 40%;
  height: 100%;
  border: 0px;
  background-color: white;
  border-radius: 7px;
}

</style>