const mongoose = require('mongoose');
const Joi = require('joi');
const ObjectId = mongoose.Schema.Types.ObjectId;

const connect4Schema = new mongoose.Schema({
  board: {
    type: Array,
    required: true,
    default: [[' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ']]
  },
  author: { type: ObjectId, ref: 'User' },
  created: { type: Date, required: true, default: Date.now() },
  lastSaved: { type: Date, required: true, default: Date.now() },
  playerOneTurn: { type: Boolean, required: true, default: true },
  active: { type: Boolean, required: true, default: true },
  winningPlayer: { type: String },
  tie: { type: Boolean }
})

function validateC4(game) {
  const schema = {
    board: Joi.array(),
    author: Joi.string(),
    created: Joi.date(),
    lastSaved: Joi.date(),
    playerOneTurn: Joi.bool().required(),
    active: Joi.bool(),
    winningPlayer: Joi.string(),
    tie: Joi.bool(),
    _id: Joi.string(),
    __v: Joi.number()
  }
  return Joi.validate(game, schema)
}

function formatBoard(game) {
  for (let i = 0; i < game.board[0].length; i++) {
    if (game.board[0][i] != ' ') {
      for (let j = game.board.length - 1; j >= 0; j--) {
        if (game.board[j][i] === ' ') {
          game.board[j].splice(i, 1, game.board[0][i])
          game.board[0].splice(i, 1, ' ')
        }
      }
    }
  }
  return game;
}

function determineWinner(game) {
  function winCon1(board) {
    let counter = { player: 0, count: 0 }
    for (let i = 0; i < board.length; i++) {
      const row = board[i]
      for (let j = 0; j < row.length; j++) {
        if (counter.count === 4) {
          game.winningPlayer = counter.player;
          game.active = false;
          return;
        }
        if (row[j] === counter.player) {
          counter.count++
        } else if (row[j] === ' ') {
          counter.player = 0
          counter.count = 0
        } else {
          counter.player = row[j]
          counter.count = 1
        }
      }
    }
  }

  function winCon2(matrix) {
    for (let i = 0; i < matrix.length; i++) {
      if (matrix[i].every((ele) => ele === matrix[i][0] && ele != ' ')) {
        game.winningPlayer = matrix[i][0];
        game.active = false;
        return;
      }
    }
  }

  function vertical(board) {
    let vertBoard = []
    let tempArr = []
    for (let i = 0; i < board[0].length; i++) {
      tempArr = []
      for (let j = 0; j < board.length; j++) {
        tempArr.push(board[j][i])
      }
      vertBoard.push(tempArr)
    }
    return winCon1(vertBoard)
  }

  function diagonals(board) {
    let diags = []
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (j + 3 < board[0].length && i + 3 < board.length) {
          diags.push([
            board[i][j],
            board[i + 1][j + 1],
            board[i + 2][j + 2],
            board[i + 3][j + 3]])
        }
        if (j - 3 >= 0 && i + 3 < board.length) {
          diags.push([
            board[i][j],
            board[i + 1][j - 1],
            board[i + 2][j - 2],
            board[i + 3][j - 3]])
        }
      }
    }
    return winCon2(diags)
  }

  winCon1(game.board);
  vertical(game.board);
  diagonals(game.board);
}


function antiCheat(game1, game2) {
  let counter = 0;
  for (let i = 0; i < game1.length; i++) {
    for (let j = 0; j < game1[i].length; j++) {
      if (game1[i][j] != game2[i][j]) {
        counter++
      }
    }
  }
  if (counter === 1)
    return true
  return false
}

module.exports = {
  Connect4: mongoose.model('Connect4Game', connect4Schema),
  validateC4: validateC4,
  formatBoard: formatBoard,
  determineWinner: determineWinner,
  antiCheat: antiCheat
}