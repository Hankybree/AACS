import Vue from 'vue'
import App from './App.vue'

//Importing axios
import axios from 'axios'
import vueAxios from 'vue-axios'
Vue.use(vueAxios, axios)

//Importing vue-sweetalerts
import SweetAlertIcons from 'vue-sweetalert-icons';
Vue.use(SweetAlertIcons);

//Importing font-awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUpload, faPaperPlane, faTimes, faHandSpock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUpload, faPaperPlane, faTimes, faHandSpock)

Vue.component('font-awesome-icon', FontAwesomeIcon)

// PWA

import './registerServiceWorker'

//Imports
import router from './router'
import store from './store'

axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;

Vue.config.productionTip = false

let vueApp = new Vue({
  router,
  store,
  render: h => h(App)
})

function secureCheck() {
  let url = 'http://localhost:8000/auth/'

  if (store.state.token) {
    axios
    .post(url + 'checkIfValidSession/')
    .then(response => {
      const user = {
        email: response.data.email,
        id: response.data.userId
      }
      let tempUser = JSON.parse(JSON.stringify(store.getters.getUser))
      store.commit('SET_IS_LOGGED_IN', true)
      store.commit('SET_USER', Object.assign(tempUser, user))
      vueApp.$mount('#app')
    })
    .catch(err => {
      console.log(err.response.data.msg);
      store.commit('SET_IS_LOGGED_IN', false)
      store.dispatch('logout')
      vueApp.$mount('#app')
    }) 
  } else {
    store.commit('RESET')
    vueApp.$mount('#app')
  }

}

secureCheck()
