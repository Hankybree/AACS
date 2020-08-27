<template>
  <div class="content">
    <ProfileDetails v-if="page === 'profileDetails'" />
    <ResetPassword v-if="page === 'resetPassword'" />
  </div>
</template>

<script>
import ProfileDetails from '../components/ProfileDetails'
import ResetPassword from '../components/Auth/ResetPassword'

export default {
  name: 'ProfileView',
  components: {
    ResetPassword,
    ProfileDetails
  },
  computed: {
    page() {
      return this.$route.params.page
    }
  }
}
</script>

<style scoped>


</style>