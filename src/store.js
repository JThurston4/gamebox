import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tttBoard: [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]],
    playerOneTurn: "X"

  },
  mutations: {
    setPlayerMove(state, board) {
      state.tttBoard = board;
    },
    setBoard(state, payload) {
      state.tttBoard = payload.board
      state.playerOneTurn = payload.player
    }
  },
  actions: {
    playerMove({ commit, dispatch }, board) {
      commit('setPlayerMove', board)
    },
    updateBoard({ commit, dispatch }, payload) {
      commit('setBoard', payload)
    }
  }
})
