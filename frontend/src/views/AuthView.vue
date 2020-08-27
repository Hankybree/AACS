<template>
  <div class="content bgColor">

    <div>
      <div class="profile-image"></div>
    </div>

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

  .profile-image {
  width: 50px;
  height: 50px;
  background-image: url("../assets/logo.png");
  background-size: contain;
  background-repeat: no-repeat;
  margin-left: 1em;
  margin-top: 1em;
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
