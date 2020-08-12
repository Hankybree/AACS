<template>
  <div class="content bgColor">

    <!-- Temp  -->
    <div id="nav">
      <input type="button" @click="goBack" value="X" class="goBackButton whiteColor"/>
    </div>

    <Login v-if="page === 'login'"/>
    <Signup v-if="page === 'signup'" />
    <ForgotPassword v-if="page === 'forgot'" />

  </div>
</template>

<script>
import Login from '../components/Auth/LogIn'
import Signup from '../components/Auth/SignUp'
import ForgotPassword from '../components/Auth/ForgotPassword'

export default {
  name: 'AuthView',
  components: {
    Login,
    Signup,
    ForgotPassword
  },
  created() {
    if (this.$store.getters.isLoggedIn) {
      this.$router.push({ name: "ExplorerView" })
    }
  },
  methods:{
    goBack(){
      this.$router.push({name: "ExplorerView"})
    }
  },
  computed:{
    page() {
      return this.$route.params.page
    }
  }
}
</script>

<style scoped>

#nav{
  width: 100%;
  height: 50pt;
  display: flex;
  background-color: transparent;
}
.goBackButton{
  background-color: transparent;
  border: 0px;
  font-size: 15pt;
}
</style>