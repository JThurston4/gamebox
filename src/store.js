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
    user: {},
    c4Game: {}

  },
  mutations: {
    setTTTGame(state, payload) {
      state.tttGame = payload;
    },
    setUser(state, user) {
      state.user = user
    },
    setC4Game(state, payload) {
      state.c4Game = payload;
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

    // #region TTT
    updateTTTBoard({ commit, dispatch }, game) {
      api.put(`games/tictactoe/${game._id}`, game)
        .then(res =>
          dispatch('getGameById', res.data._id)
        )
    },
    newGameTTT({ commit }, game) {
      api.post('games/tictactoe', game)
        .then(res => commit('setTTTGame', res.data))
    },
    async getTTTById({ commit }, id) {
      let response = await api.get(`games/tictactoe/${id}`)
      commit('setTTTGame', response.data)
    },
    // DELETE HAS NOT BEEN TESTED
    async deleteTTTGame({ commit }, id) {
      let response = await api.delete(`games/tictactoe/${id}`)
      if (response.status === 200)
        commit('setTTTGame', {})
    },
    //#endregion

    // #region C4
    async newGameC4({ commit, dispatch }, game) {
      let response = await api.post(`games/connect4`)
      dispatch('getC4ById', response.data._id)
    },

    async getC4ById({ commit }, id) {
      let response = await api.get(`games/connect4/${id}`)
      commit('setC4Game', response.data)
    },

    async updateC4Game({ dispatch }, game) {
      let response = await api.post(`games/connect4/${game._id}`)
      if (response.status === 200)
        dispatch('getC4ById', response.data._id)
    },

    // DELETE HAS NOT BEEN TESTED
    async deleteC4Game({ commit }, id) {
      let resposne = await api.delete(`games/connect4/${id}`)
      if (resposne.status === 200)
        commit('setC4Game', {})
    },
    //#endregion
  }
})
