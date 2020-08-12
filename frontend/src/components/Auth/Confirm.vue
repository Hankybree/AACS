<template>
  <div class="content">
    <h2>{{message}}</h2>
    <h2>hinasiafngsa</h2>
  </div>
</template>

<script>
export default {
  name: "Confirm",
  created(){
    let url = "http://localhost:8000/"

    this.axios
    .post(url + "auth/confirm", {
      token: this.$route.params.token
    })
    .then(res => {
      this.message = res.data.msg
      setTimeout(() => {
        this.$router.push({ name: "ExplorerView", params: { page: 'login' }})
      }, 1500)
    })
    .catch(err => {
      this.message = err.response.data.msg
    })
  },
  data(){
    return{
      email: "",
      password: "",
      message: "Loading..."
    }
  }
}
</script>

<style scoped>

</style>