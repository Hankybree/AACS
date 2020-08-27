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
import ProfileView from '../views/ProfileView'
import PurchaseView from '../views/PurchaseView'
import OfflineView from '../views/OfflineView'
import PhotoView from '../views/PhotoView'
import FeedView from '../views/FeedView'
import FileUploadView from '../views/FileUploadView'
//import store from '../store'

//Usage
Vue.use(VueRouter)
Vue.use(Vuex)

//Router configuration
const router = new VueRouter({
  routes: [
    {
      name: 'ExplorerView',
      component: ExplorerView,
      path: '/',
      meta: {
        requiresAuth: true
      }
    },
    {
      name: 'FeedView',
      component: FeedView,
      path: '/feed',
      meta: {
        requiresAuth: true
      }
    },
    {
      name: 'FileUploadView',
      component: FileUploadView,
      path: '/fileupload',
      meta: {
        requiresAuth: true
      }
    },
    {
      name: 'AuthView',
      component: AuthView,
      path: '/auth/:page/:token?'
    },
    {
      name: 'ProfileView',
      component: ProfileView,
      path: '/profile/:page?',
      meta: {
        requiresAuth: true
      }
    },
    {
      name: 'PurchaseView',
      component: PurchaseView,
      path: '/purchase'
    },
    {
      name: 'OfflineView',
      component: OfflineView,
      path: '/offline'
    },
    {
      name: 'PhotoView',
      component: PhotoView,
      path: '/photo/:photoid'
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const permission = await hasPermission()

  if (navigator.onLine == 'Offline') {
    if (to.meta.requiresAuth) {
      if (permission) {
  
        next()
      } else {
        next({ name: 'AuthView', params: { page: 'login' } })
      }
    } else {
      next()
    }
  } else {
    next()
  }
})

function hasPermission() {
  return new Promise((resolve) => {
    Axios.post('auth/checkIfValidSession')
      .then(() => {
        resolve(true)
      })
      .catch(() => {
        resolve(false)
      })
  })
}

//Export the router
export default router
