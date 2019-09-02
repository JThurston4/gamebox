import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tttBoard: [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]],
    winner: {active: true, winningPlayer: ''}

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
      let cols = [[], [], []];
      let diags = [[], []]

      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          cols[j].push(board[i][j])
          if (i === j) {
            diags[0].push(board[i][j])
          }
          if (i + j === 2) {
            diags[1].push(board[i][j])
          }
        }
      }
      let winCons = (matrix) => {
        for (let i = 0; i < matrix.length; i++) {
          if (matrix[i].every((element) => { return element === matrix[i][0] }) && matrix[i][0] != ' ') {
            commit('setWinner', { active: false, winningPlayer: matrix[i][0] })
          }
        }
      }
      winCons(board);
      winCons(diags);
      winCons(cols);
      commit('setBoard', board)
    },
    reset({ commit }, payload) {
      commit('setNewGame', payload)
    }
  }
})
