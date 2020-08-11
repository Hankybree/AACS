<template>
  <div class="content">
      
      <!-- Submit which allows user to upload file from local disc -->
      <form @submit.prevent="sendFile" enctype="multipart/form-data">
        <div class="field">

            <label for="file"></label>
            <input type="file"
            ref="file"
            @change="selectFile"/>
        </div>

        <div class="field">
            <button class="submit-button">Upload</button>
        </div>

      </form>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FileUpload',

  data() {
      return {
          file: ''
      }
  },

  methods: {
      selectFile() {
          this.file = this.$refs.file.files[0]
      },

      async sendFile() {
          const formData = new FormData()
          formData.append('file', this.file)
          
          try {
              await axios.post('/upload', formData)
          } catch(err) {
              console.log(err)
          }
          
      }
  }
}
</script>

<style scoped>

</style>