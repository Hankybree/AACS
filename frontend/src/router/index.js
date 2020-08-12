/*
  TODO
    * Add meta-tag for requiresAuth
    * Prevent navigating without Authentication
*/

import Vue from 'vue'

//Libraries
import VueRouter from 'vue-router'
import Vuex from 'vuex'

// Views
import AuthView from '../views/AuthView'
import ExplorerView from '../views/ExplorerView'
import ImageView from '../views/ImageView'
import ProfileView from '../views/ProfileView'
import PurchaseView from '../views/PurchaseView'
import OfflineView from '../views/OfflineView'
import ConfirmView from '../components/Auth/Confirm'

//Usage
Vue.use(VueRouter)
Vue.use(Vuex)

//Router configuration
const router = new VueRouter({
  mode: 'history',
  routes: [{
    name: "ExplorerView",
    component: ExplorerView,
    path: '/' 
  }, {
    name: "AuthView",
    component: AuthView, 
    path: '/auth/:page' 
  }, { 
    name: "ProfileView",
    component: ProfileView, 
    path: '/profile' 
  }, { 
    name: "ImageView",
    component: ImageView, 
    path: '/:id' 
  }, { 
    name: "PurchaseView",
    component: PurchaseView, 
    path: '/purchase'
  }, {
    name: "OfflineView",
    component: OfflineView, 
    path: '/offline'
  }, {
    name: "ConfirmView",
    component: ConfirmView,
    path: '/auth/confirm/'
  }]
})

//Export the router
export default router