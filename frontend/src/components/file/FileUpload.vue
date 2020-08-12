<template>
  <div class="content">
    <button id="show-modal" @click="showModal = true">Upload Files</button>

    <transition name="modal">
      <div class="modal-mask" v-if="showModal">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <slot name="header">Choose Files to Upload</slot>
            </div>

            <div class="modal-body">
              <div class="form-container">
                <!-- Submit which allows user to upload file from local disc -->
                <form @submit.prevent="sendFile" enctype="multipart/form-data">
                  <div class="field">
                    <label for="file"></label>
                    <input type="file" id="file" ref="file" @change="selectFile" />
                  </div>

                  <div class="field">
                    <button class="submit-button">Upload</button>
                  </div>
                </form>
              </div>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                <button class="modal-default-button" @click="showModal = false">OK</button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FileUpload",

  data() {
    return {
      file: "",
      showModal: false,
    };
  },

  methods: {
    selectFile() {
      this.file = this.$refs.file.files[0];
    },

    async sendFile() {
      const formData = new FormData();
      formData.append("file", this.file);

      try {
        await axios.post("/upload", formData);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
#file {
  background-color: aqua;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 80%;
  margin: 0px auto;
  padding: 10pt 20pt;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Montserrat, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.submit-button {
  background-color: #102eb1b4;
  color: white;
  font-weight: 500;
  padding: 0.5em 0.9em;
  margin-top: 1em;
  text-transform: uppercase;
  border-style: none;
  cursor: pointer;
}

.submit-button:hover {

}
</style>