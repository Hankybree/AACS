import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './../router'

import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'
var ls = new SecureLS({
  encodingType: 'rc4',
  isCompression: false,
  encryptionSecret: 'r89RnWwJUuudXPSwaJyCdvSv7zVJ5G4ajKwBGbqAZr3mx7JQ4mX'
})
import { client } from '../scripts/client.js'

Vue.use(Vuex)

let state = {
  token: '',
  user: {},
  isLoggedIn: false,
  socket: null,
  images: [],
  buttonColor: 'white'
}

// ======================
//        Mutations
// ======================
const mutations = {
  SET_IS_LOGGED_IN(state, payload) {
    state.isLoggedIn = payload
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  RESET: (state) => {
    Object.assign(state, getDefaultState())
  },
  setImages(state, newImages) {
    state.images = newImages
  },
  setSocket(state, newSocket) {
    state.socket = newSocket
  },
  appendImages(state, newImages) {
    newImages.forEach((newImage) => {
      if (!state.images.some((image) => image.imageId === newImage.imageId)) {
        state.images.push(newImage)
      }
    })
  },
  setShowFeed(state, newShowFeed) {
    state.showFeed = newShowFeed
  },
  setLike(state, data) {
    if (data.isLiking) {
      state.images
        .find((image) => image.imageId === data.likeImageId)
        .likes.push(data.likeUserId)
    } else {
      let likeArray = state.images.find(
        (image) => image.imageId === data.likeImageId
      ).likes
      likeArray.splice(likeArray.indexOf(data.likeUserId), 1)
    }
  },
  setComment(state, data) {
    state.images
      .find((image) => image.imageId === data.commentImageId)
      .comments.unshift({
        commentId: data.commentId,
        commentUserId: data.commentUserId,
        commentMessage: data.commentMessage,
        commentCreationTime: data.commentCreationTime
      })
  },
  deleteComment(state, data) {
    let commentArray = state.images.find(
      (image) => image.imageId === data.imageId
    ).comments
    commentArray.splice(
      commentArray.indexOf(
        commentArray.find((comment) => comment.commentId === data.commentId)
      ),
      1
    )
  },
  setButtonColor(state, newButtonColor) {
    state.buttonColor = newButtonColor
  }
}

const getDefaultState = () => {
  return {
    token: '',
    user: {}
  }
}

// ======================
//        GETTERS
// ======================
const getters = {
  isLoggedIn: (state) => {
    return state.isLoggedIn
  },
  getUser: (state) => {
    return state.user
  }
}

// ======================
//        ACTIONS
// ======================
const actions = {
  login: ({ commit }, { token, user }) => {
    commit('SET_TOKEN', token)
    commit('SET_USER', user)
    commit('SET_IS_LOGGED_IN', true)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    router.push({ name: 'ExplorerView' })
    subscribeToPush(user.id)
  },
  logout: ({ commit }) => {
    commit('RESET', '')
    commit('SET_IS_LOGGED_IN', false)
    if (router.currentRoute.name !== 'AuthView') {
      router.push({ name: 'AuthView', params: { page: 'login' } })
    }
  },
  // METHODS FOR HANDLING OUTGOING SOCKET DATA
  connect(context) {
    client.connect(context)
  },
  disconnect(context) {
    client.disconnect(context)
  },
  like: (context, imageId) => {
    context.state.socket.send(
      JSON.stringify({
        status: 2,
        likeImageId: imageId,
        likeUserId: context.state.user.id
      })
    )
  },
  comment: (context, data) => {
    context.state.socket.send(
      JSON.stringify({
        status: 3,
        commentImageId: data.imageId,
        commentUserId: context.state.user.id,
        commentMessage: data.message
      })
    )
  },
  deleteComment(context, data) {
    context.state.socket.send(
      JSON.stringify({
        status: 4,
        imageId: data.imageId,
        commentId: data.commentId
      })
    )
  }
}
const webpush = require('web-push')


function subscribeToPush(userId) {
  

  const vapidKeys = webpush.generateVAPIDKeys();


  if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/service-worker.js')

    navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
      serviceWorkerRegistration.pushManager.getSubscription().then((subscription) => {
        if (!subscription) {
          serviceWorkerRegistration.pushManager
          .subscribe({
            // The public key in the correct format
            applicationServerKey: urlBase64ToUint8Array(vapidKeys.publicKey),
            // Notifications will be used for user visible messages only
            userVisibleOnly: true
          })
          .then((pushSubscription) => {
              
              axios.post('/push/subscribe', {
                body: {pushSubscription, userId, pubprivkeys: {pub: vapidKeys.publicKey, priv: vapidKeys.privateKey}},
                headers: {
                  'Content-Type': 'application/json'
                },
              })
                .then(() => {
                  console.log('Subscribed!')
                })
                .catch((error) => {
                  console.error(error)
                })
  
          })
        }
      })
    
    })
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}


}

const store = new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key)
      }
    })
  ],
  state,
  mutations,
  getters,
  actions
})

export default store
