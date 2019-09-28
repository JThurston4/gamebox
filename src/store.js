import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

let production = !window.location.host.includes('localhost')
let baseUrl = production ? "we'll get there when we get there" : 'localhost:7000';

let api = axios.create({
  baseUrl,
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    tttGame: [],

  },
  mutations: {
    setNewGame(state, payload) {
      state.tttBoard = payload.board;
      state.winner.active = payload.active
    },
    setBoard(state, board) {
      state.tttBoard = board
    },
    setWinner(state, winner) {
      state.winner = winner
    }
  },
  actions: {
    updateBoard({ commit, dispatch }, board) {
      
      // commit('setBoard', board)
    },
    reset({ commit }, payload) {
      commit('setNewGame', payload)
    }
  }
})
