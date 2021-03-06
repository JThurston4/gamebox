import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from './router';

Vue.use(Vuex)

// let production = !window.location.host.includes('localhost')
// let baseUrl = production ? "we'll get there when we get there" : 'localhost:9001/api';
let baseUrl = '//localhost:9001/api';

let api = axios.create({
  baseURL: baseUrl,
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    tttGame: {},
    user: {}

  },
  mutations: {
    setGame(state, payload) {
      state.tttGame = payload;
    },
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    //#region users
    register({ commit }, newUser) {
      api.post('users/register', newUser)
        .then(res => {
          debugger
          commit('setUser', res.data)
          router.push({ name: 'home' })
        })
    },
    authenticate({ commit }) {
      api.get('users/authenticate')
        .then(res => {
          commit('setUser', res.data)
          // router.push({name: something???})
        })
    },
    login({ commit }, creds) {
      api.post('users/login', creds)
        .then(res => {
          commit('setUser', res.data)
          router.push({name: 'home'})
        })
    },
    logout({ commit }) {
      api.delete('users/logout')
        .then((res) => {
          commit('setUser')
        })
      router.push({name: 'home'})
    },
    //#endregion

    updateBoard({ commit, dispatch }, game) {
      api.put(`games/tictactoe/${game._id}`, game)
        .then(res =>
          dispatch('getGameById', res.data._id)
        )
    },
    newGameTTT({ commit }, game) {
      api.post('games/tictactoe', game)
        .then(res => commit('setGame', res.data))
    },
    async getGameById({ commit }, id) {
      let response = await api.get(`games/tictactoe/${id}`)
      commit('setGame', response.data)
    }
    // async newGameTTT({ commit }) {
    //   const game = await api.post('games/tictactoe')
    //   commit('setNewGame', game)
    // }
  }
})
