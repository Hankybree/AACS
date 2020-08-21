/*
  TODO
    * Add meta-tag for requiresAuth
    * Prevent navigating without Authentication
*/

import Vue from 'vue'

//Libraries
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Axios from 'axios'

// Views
import AuthView from '../views/AuthView'
import ExplorerView from '../views/ExplorerView'
import ImageView from '../views/ImageView'
import ProfileView from '../views/ProfileView'
import PurchaseView from '../views/PurchaseView'
import OfflineView from '../views/OfflineView'

//import store from '../store'

//Usage
Vue.use(VueRouter)
Vue.use(Vuex)

//Router configuration
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      name: "ExplorerView",
      component: ExplorerView,
      path: '/',
      meta: { 
        requiresAuth: true
      }
    }, {
      name: "AuthView",
      component: AuthView,
      path: '/auth/:page/:token?'
    }, {
      name: "ProfileView",
      component: ProfileView,
      path: '/profile',
      meta: {
        requiresAuth: true
      }
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
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  // Tack ESLINT!!!!!!
  console.log(from)
  
  const permission = await hasPermission()

  if (to.meta.requiresAuth) {
    if (permission) {
      
      next()
    } else {
      next({ name: 'AuthView', params: { page: 'login'}, replace: true })
    }
  } else {
    next()
  }
})

function hasPermission() {

  return new Promise((resolve) => {
    Axios.post('http://localhost:8000/auth/checkIfValidSession')
    .then(() => {
      resolve(true)
    }).catch(() => {
      resolve(false)
    })
  })
}

//Export the router
export default router