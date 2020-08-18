<template>
  <div class="content">
    <button class="open-upload-button" id="show-modal" @click="showModal = true">Upload Files</button>
    <transition name="modal">
      <div class="modal-mask" v-if="showModal">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <!-- Close button-->
              <div class="closemodal-button">
                <button class="closemodal-button" @click="closeModal">X</button>
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
                    <label for="file">
                      <font-awesome-icon :icon="['fas', 'upload']" /> Choose files..
                    </label>
                    <button class="submit-button1" v-if="this.files.length" @click="closePreview"> <font-awesome-icon :icon="['fas', 'paper-plane']" /> </button>
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
                  <div class="preview-container" :style="togglePreview">
                    <div class="row">
                      <div v-for="(file, index) in files" :key="index">
                        <div class="preview">
                          <div class="preview-img" v-if="file.invalidMessage" style="background-color:red; display: inline-block"></div>
                          <img class="preview-img" :src="file.URL" alt v-if="!file.invalidMessage"/>
                          
                          <!-- Delete specific file from upload-->
                          <span class="delete">
                            <button
                              class="delete-btn"
                              @click.prevent="files.splice(index, 1); uploadFiles.splice(index, 1)"
                            >X</button>
                          </span>
                          <!-- {{file.name}} -->
                          <!-- <span class="file-error" v-if="file.invalidMessage" style="color:red">{{file.invalidMessage}}</span> -->
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="status-icon">
                  <sweetalert-icon v-if="success" icon="success" />
                  <sweetalert-icon v-if="error" icon="error" />
                </div>
                  <div class="field">
                    <button class="submit-button" v-if="this.files.length && error" @click="closePreview">Try again</button>
                    
                  </div>
                </form>
              </div>
            </div>

            <!-- -----------------------
      Animate succes icon - can be one of: "success", "warning", "info", "error" and "loading" 
            --------------------------->

            <div class="modal-footer">
              <slot name="footer">
                
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
      previewStatus: false
    };
  },

  methods: {
    closeModal() {
      this.showModal = false;
      this.success = false;
      this.error = false;
      this.message = "";
    },

    selectFile() {
      this.previewStatus = false;
      this.success = false;
      this.message = "";

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
          URL: URL.createObjectURL(file), // Create URL for preview of image
        })),
      ];
    },

    validate(file) {
      const MAX_SIZE = 400000;
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (file.size > MAX_SIZE) {
        return `Max size: ${MAX_SIZE / 1000}Kb`;
        // Add error msg saying one or more files are unvalid
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
      _.forEach(this.uploadFiles, (file) => {
        if (this.validate(file) === "") {
          formData.append("files", file);
        }
      });

      try {
        await axios.post(url + "fileuploads/upload/", formData);
        this.message = "File(s) successfully uploaded!";
        this.success = true;
        this.files = [];
        this.uploadFiles = [];
      } catch (err) {
        console.log(err);
        this.message = err;
        this.error = true;
        this.previewStatus = false;
      }
    },
    closePreview() {
      this.previewStatus = true
    }
  },
  computed: {
    togglePreview() {
      if(this.previewStatus) {
        return {
          display: 'none'
        }
      }
      else {
        return {}
      }
    }
  }
};
</script>

<style scoped>
/** Input is "hidden" so that label can be used to style as a button instead..
  */
.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

label {
  font-size: 1.15em;
  font-weight: 700;
  color: white;
  background-color: #0a0a27;
  display: inline-block;
  cursor: pointer;
  padding: 1em;
}

label:hover {
  background-color: #060635;
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

.open-upload-button {
  background-color: #102eb1b4;
  color: white;
  font-weight: 500;
  padding: 0.5em 0.9em;
  margin-top: 1em;
  text-transform: uppercase;
  border-style: none;
  cursor: pointer;
}

.submit-button {
  background-color: #102eb1b4;
  color: white;
  font-weight: 500;
  padding: 0.5em 0.9em;
  margin-top: 2em;
  text-transform: uppercase;
  
  border-style: none;
  cursor: pointer;
}

.submit-button1 {
  border-end-end-radius: 10%;
  border-start-end-radius: 10%;
  font-size: 1.15em;
  font-weight: 700;
  color: #0b58a5;
  background-color: white;
  border-color: #0a0a27;
  border-width: 0.5px;
  display: inline-block;
  cursor: pointer;
  padding: 1em;
  cursor: pointer;
  transition: 0.3s ease;
}

.submit-button1:hover {
  background-color: #0b58a5;
  color: white;
  padding-top: 1em;
  padding-left: 2em;
  transition: 0.3s ease;
  border-style: none;
  padding-bottom: 1.04em;
}

.submit-button:hover {
  background-color: #2c3e50;
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
  padding: 0.25em 0.53em;
  background-color: white;
  color: rgb(77, 70, 70);
  border-style: solid;
  margin-left: -1em;
  margin-top: -1em;
  cursor: pointer;
}

.delete {
  text-align: end;
}

/** Success icon animation */

.status-icon {
  margin-left: 3em;
}

/**preview image */
.preview {
  margin-top: 0.5em;
}

.preview-img {
  width: 80px;
  height: 80px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}

.preview-img-err {
  width: 80px;
  height: 80px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  background-color: rgba(243, 6, 6, 0.438);
  z-index: 200;
}

.preview-container {
  padding: 2em;
  height: 5em;
  /** Had some bugs with the inline-block when changing size of browser-window. */
  display: inline-block;
  overflow: auto;
}

.row {
  display: flex;
  flex-wrap: wrap;
  padding: 0 4px;
}

.fileerror {
  margin-left: -10em;
  display: inline;
}

/** Bypass default margins */
.status-icon {
  margin-bottom: -2em;
}
</style>