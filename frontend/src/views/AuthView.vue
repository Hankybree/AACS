<template>
  <div class="content bgColor">

    <Login v-if="page === 'login'"/>
    <Signup v-if="page === 'signup'" />
    <ForgotPassword v-if="page === 'forgot'" />
    <Confirm v-if="page === 'confirm'" />
    
  </div>
</template>

<script>
  import Login from '../components/Auth/LogIn'
  import Signup from '../components/Auth/SignUp'
  import ForgotPassword from '../components/Auth/ForgotPassword'
  import Confirm from '../components/Auth/Confirm'

  export default {
    name: 'AuthView',
    components: {
      Login,
      Signup,
      ForgotPassword,
      Confirm
    },
    created() {
      if (this.$store.getters.isLoggedIn) {
        this.$router.push({ name: 'ExplorerView' })
      }
    },
    computed: {
      page() {
        return this.$route.params.page
      }
    }
  }
</script>

<style scoped>
  .goBackButton {
    background-color: transparent;
    border: 0px;
    font-size: 15pt;
  }

  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Spartan&display=swap');


  /deep/ input,
    input::-webkit-input-placeholder {
        font-size: 15px !important;
    }

  /deep/ .errorMessage {
    text-align: center;
    border: 1px solid rgba(200, 0, 0, 0.6);
    padding: 8px;
    border-radius: 3px;
    font-size: 10pt;
  }

  /deep/ .successMessage {
    text-align: center;
    border: 1px solid rgba(8, 146, 15, 0.6);
    padding: 8px;
    border-radius: 3px;
    font-size: 10pt;
  }
</style>
