import Vue from 'vue'
import App from './App.vue'

// Libraries

import VueRouter from 'vue-router'
import Vuex from 'vuex'

// Custom scripts

import { actions } from './scripts/actions.js'

Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter({
  routes: [

  ]
})

const store = new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: actions
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
