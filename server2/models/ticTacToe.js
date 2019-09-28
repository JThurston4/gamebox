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
  winningPlayer: {type: String}
})

function validateTTT(game) {
  const schema = {
    board: Joi.array(),
    created: Joi.date(),
    lastSaved: Joi.date(),
    playerOneTurn: Joi.bool().required(),
    active: Joi.bool(),
    winningPlayer: Joi.string()
  }

  return Joi.validate(game, schema)
}

function determineWinner(game) {
  let cols = [[], [], []];
  let diags = [[], []]

  for (let i = 0; i < game.length; i++) {
    for (let j = 0; j < game[i].length; j++) {
      cols[j].push(game[i][j])
      if (i === j) {
        diags[0].push(game[i][j])
      }
      if (i + j === 2) {
        diags[1].push(game[i][j])
      }
    }
  }
  let winCons = (matrix) => {
    for (let i = 0; i < matrix.length; i++) {
      if (matrix[i].every((element) => { return element === matrix[i][0] }) && matrix[i][0] != ' ') {
        game.active = false;
        game.winningPlayer = matrix[i][0]
        return game
      }
    }
  }
  winCons(game);
  winCons(diags);
  winCons(cols);
}

module.exports.TicTacToe = mongoose.model('TicTacToeGame', ticTacToeSchema)
module.exports.validateTTT = validateTTT
module.exports.determineWinner = determineWinner;