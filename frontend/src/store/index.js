import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import router from './../router';

import createPersistedState from 'vuex-persistedstate';
import SecureLS from "secure-ls";
var ls = new SecureLS({ encodingType: 'rc4', isCompression: false, encryptionSecret: 'r89RnWwJUuudXPSwaJyCdvSv7zVJ5G4ajKwBGbqAZr3mx7JQ4mX' });
import { client } from '../scripts/client.js'

Vue.use(Vuex);


let state = {
  token: '',
  user: {},
  isLoggedIn: false,
  socket: null,
  images: [],
  message: ''
};


// ======================
//        Mutations
// ======================
const mutations = {
  SET_IS_LOGGED_IN(state, payload) {
    state.isLoggedIn = payload
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USER: (state, user) => {
    state.user = user;
  },
  RESET: state => {
    Object.assign(state, getDefaultState());
  },
  setImages(state, newImages) {
    state.images = newImages
  },
  setSocket(state, newSocket) {
    state.socket = newSocket
  },
  appendImages(state, newImages) {
    newImages.forEach(newImage => {
      if(!state.images.some(image => image.imageId === newImage.imageId)) {
        state.images.push(newImage)
      }
    })
  },
  setMessage(state, newMessage) {
    state.message = newMessage
  }
}


const getDefaultState = () => {
  return {
    token: '',
    user: {}
  };
};

// ======================
//        GETTERS
// ======================
const getters = {
  isLoggedIn: state => {
    return state.isLoggedIn;
  },
  getUser: state => {
    return state.user;
  },
}

// ======================
//        ACTIONS
// ======================
const actions = {
  login: ({ commit }, { token, user }) => {
    commit('SET_TOKEN', token);
    commit('SET_USER', user);
    commit('SET_IS_LOGGED_IN', true)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    router.push({ name: 'ExplorerView' })
  },
  logout: ({ commit }) => {
    commit('RESET', '');
    commit('SET_IS_LOGGED_IN', false)
    if (router.currentRoute.name !== 'Trips') {
      router.push({ name: 'AuthView', params: { page: 'login'} })
    }
  },
  // METHODS FOR HANDLING OUTGOING SOCKET DATA
  connect(context) {
    client.connect(context)
  },
  like: (context, imageId) => {
    context.state.socket.send(JSON.stringify({ status: 2, likeImageId: imageId, likeUserId: context.state.userId }))
  },
  comment: (context, imageId) => {
    context.state.socket.send(JSON.stringify({ status: 3, commentImageId: imageId, commentUserId: context.state.userId, commentMessage: context.state.message, currentPage: context.state.currentPage }))
    context.commit('setMessage', '')
  },
  deleteComment(context, data) {
    context.state.socket.send(JSON.stringify({ status: 4, imageId: data.imageId, commentId: data.commentId }))
  }
}



const store = new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
  state,
  mutations,
  getters,
  actions,
});


export default store;

