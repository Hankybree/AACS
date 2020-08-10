import Vue from 'vue'
import App from './App.vue'

// Libraries

import VueRouter from 'vue-router'
import Vuex from 'vuex'

// Custom scripts

import { actions } from './scripts/actions.js'

// Views

import AuthView from './views/AuthView.vue'
import ExplorerView from './views/ExplorerView.vue'
import ImageView from './views/ImageView.vue'
import ProfileView from './views/ProfileView.vue'
import PurchaseView from './views/PurchaseView.vue'
import OfflineView from './views/OfflineView.vue'

// PWA

import './registerServiceWorker'

Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter({
  routes: [
    { component: ExplorerView, path: '/' },
    { component: AuthView, path: '/authentication' },
    { component: ProfileView, path: '/profile' },
    { component: ImageView, path: '/:id' },
    { component: PurchaseView, path: '/purchase'},
    { component: OfflineView, path: '/offline'}
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
