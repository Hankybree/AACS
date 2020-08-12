<template>
  <div class="content">
    <h1 class="whiteColor">Forgot password</h1>
    
    <!-- Reset password components -->
    <div id="reset-password-components">
      <label for="reset-password-email" class="whiteColor">Email</label>
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
      let isValid = this.checkValidation()

      if(isValid){
        let url = "http://localhost:8000/"

        const credentials = { email: this.email }
        this.axios
        .post(url + "reset-password/", credentials)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
      }
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

#reset-password-components label {
  padding-bottom: 5px;
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