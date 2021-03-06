const mongoose = require('mongoose');
const Joi = require('joi');
let ObjectId = mongoose.Schema.Types.ObjectId;

const ticTacToeSchema = new mongoose.Schema({
  board: { type: Array, required: true, default: [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]]},
  author: { type: ObjectId, ref: 'User' },
  created: { type: Date, required: true, default: Date.now() },
  lastSaved: { type: Date, default: Date.now() },
  playerOneTurn: { type: Boolean, required: true },
  active: { type: Boolean, required: true, default: true },
  winningPlayer: { type: String },
  tie: { type: Boolean, required: true, default: false }
})

function validateTTT(game) {
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

function determineWinner(game) {
  let cols = [[], [], []];
  let diags = [[], []]

  for (let i = 0; i < game.board.length; i++) {
    for (let j = 0; j < game.board[i].length; j++) {
      cols[j].push(game.board[i][j])
      if (i === j) {
        diags[0].push(game.board[i][j])
      }
      if (i + j === 2) {
        diags[1].push(game.board[i][j])
      }
    }
  }
  let winCons = (matrix) => {
    for (let i = 0; i < matrix.length; i++) {
      if (matrix[i].every((element) => { return element === matrix[i][0] }) && matrix[i][0] != ' ') {
        game.active = false;
        game.winningPlayer = matrix[i][0]
      }
    }
  }
  let tie = (matrix) => {
    const flatBoard = matrix.reduce((acc, curr) => {
      return acc.concat(curr)
    })
    if (flatBoard.every((element) => { return element === 'X' || element === 'O' })) {
      game.active = false;
      game.tie = true;
    }
  }

  winCons(game.board);
  winCons(diags);
  winCons(cols);
  tie(game.board);
  return game
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

module.exports.TicTacToe = mongoose.model('TicTacToeGame', ticTacToeSchema)
module.exports.validateTTT = validateTTT
module.exports.determineWinner = determineWinner;
module.exports.antiCheat = antiCheat;