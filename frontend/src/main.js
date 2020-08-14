import Vue from 'vue'
import App from './App.vue'

//Importing axios
import axios from 'axios'
import vueAxios from 'vue-axios'
Vue.use(vueAxios, axios)

//Importing vue-sweetalerts
import SweetAlertIcons from 'vue-sweetalert-icons';
Vue.use(SweetAlertIcons);

// Custom scripts
// import { actions } from './scripts/actions.js'

// PWA

import './registerServiceWorker'

//Imports
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
