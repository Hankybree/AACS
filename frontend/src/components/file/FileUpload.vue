<template>
  <div class="content">
    <button class="submit-button" id="show-modal" @click="showModal = true">Upload Files</button>
    <transition name="modal">
      <div class="modal-mask" v-if="showModal">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <!-- Close button-->
              <div class="closemodal-button">
                <button class="closemodal-button" @click="showModal = false">X</button>
              </div>
              <!-- Header-->
              <slot name="header">Choose Files to Upload</slot>
            </div>
            <!-- Body-->
            <div class="modal-body">
              <div class="form-container">
                <!-- Submit which allows user to upload file from local disc -->
                <form @submit.prevent="sendFile" enctype="multipart/form-data">
                  <div class="field">
                    <label for="file">Choose files..</label>
                    <input
                      multiple
                      type="file"
                      id="file"
                      class="inputfile"
                      ref="files"
                      @change="selectFile"
                    />
                  </div>
                  <!-- Iterate through and show files added to files array -->
                  <div class="field">
                    <div v-for="(file, index) in files" :key="index">
                      <div>
                        {{file.name}}
                        <span v-if="file.invalidMessage">{{file.invalidMessage}}</span>
                        <!-- Delete specific file from upload-->
                        <button
                          class="delete-btn"
                          @click.prevent="files.splice(index, 1); uploadFiles.splice(index, 1)"
                        >X</button>
                      </div>
                    </div>
                  </div>

                  <div class="field">
                    <button class="submit-button">Upload</button>
                  </div>
                </form>
              </div>
            </div>

            <!-- -----------------------
      Animate succes icon - can be one of: "success", "warning", "info", "error" and "loading" 
            --------------------------->

            <div class="modal-footer">
              <slot name="footer">
                <div class="status-icon">
                  <sweetalert-icon v-if="success" icon="success" />
                </div>
                <div v-if="message">
                  <div class="upload-message">{{message}}</div>
                </div>
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
import _ from "lodash";

export default {
  name: "FileUpload",

  data() {
    return {
      files: [],
      uploadFiles: [],
      error: false,
      success: false,
      message: "",
      showModal: false,
    };
  },

  methods: {
    selectFile() {
      const files = this.$refs.files.files;
      // append files to array
      this.uploadFiles = [...this.files, ...files];
      // create object to validate client side
      this.files = [
        ...this.files,
        ..._.map(files, (file) => ({
          name: file.name,
          size: file.size,
          type: file.type,
          invalidMessage: this.validate(file),
        })),
      ];

      //   const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      //   const MAX_SIZE = 400000;
      //   const tooLarge = file.size > MAX_SIZE;

      //   if (allowedTypes.includes(file.type) && !tooLarge) {
      //     this.file = file;
      //     this.error = false;
      //     this.message = "";
      //   } else {
      //     this.error = true;
      //     this.message = tooLarge ? `File to large. Max size of ${MAX_SIZE/1000}KB` : "Only images allowed";
      //   }
    },

    validate(file) {
      const MAX_SIZE = 400000;
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (file.size > MAX_SIZE) {
        return `Max size: ${MAX_SIZE / 1000}Kb`;
      }

      if (!allowedTypes.includes(file.type)) {
        return "Not an image file";
      } else {
        return "";
      }
    },

    async sendFile() {
      let url = "http://localhost:8000/";
      const formData = new FormData();

      // Validate each file to make sure no wrong fileformats gets sent to server. Run validate and append to formData if OK!
      _.forEach(this.uploadFiles, file => {
        if (this.validate(file) === "") {
          formData.append("files", file);
        }
      });

      try {
        await axios.post(url + "fileuploads/upload/", formData);
        this.message = "File successfully uploaded";
        this.success = true;
        this.files = [];
        this.uploadFiles = [];
      } catch (err) {
        console.log(err);
        this.message = err.response.data.error;
        this.error = true;
      }
    },
  },
};
</script>

<style scoped>
/** Input is "hidden" so that label can be used to style as a button instead..
    Will add upload icon to label later.*/
.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

label {
  font-size: 1.25em;
  font-weight: 700;
  color: white;
  background-color: black;
  display: inline-block;
  cursor: pointer;
  padding: 1em;
}

label:hover {
  background-color: navy;
}
/** Modal (Popup) */
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

/** Buttons */

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

.closemodal-button {
  text-align: start;
  background-color: transparent;
  color: black;
  font-weight: 700;
  font-size: 1.5rem;
  text-transform: uppercase;
  border-style: none;
  cursor: pointer;
}

.delete-btn {
  border-radius: 50%;
  padding: 1em;
  background-color: #f05011;
  border: none;
  color: white;
}

/** Success icon animation */

.status-icon {
  margin-left: 3em;
}
</style>