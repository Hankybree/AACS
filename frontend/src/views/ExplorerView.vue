<template>
  <div class="content">
      <!-- Söka efter publika bilder -->

      <!-- TEMP --> 
      <router-link :to="{ name: 'AuthView', params: { page: 'login' }}"><span class="whiteColor">Login</span></router-link><br><br>
      <router-link :to="{ name: 'ProfileView'}"><span class="whiteColor">Profile</span></router-link>
  </div>
</template>

<script>
export default {
  name: 'ExplorerView'
}
</script>

<style scoped>

</style>
