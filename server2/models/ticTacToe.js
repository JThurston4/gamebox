const mongoose = require('mongoose');
const Joi = require('joi');
let ObjectId = mongoose.Schema.Types.ObjectId;

const ticTacToeSchema = new mongoose.Schema({
  board: { type: Array, required: true, default: [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]]},
  // author: { type: ObjectId, ref: 'User', required: true },
  created: { type: Date, required: true, default: Date.now() },
  lastSaved: { type: Date, default: Date.now() },
  playerOneTurn: { type: Boolean, required: true}
})

function validateTTT(game) {
  const schema = {
    board: Joi.array(),
    created: Joi.date(),
    lastSaved: Joi.date(),
    playerOneTurn: Joi.bool().required()
  }

  return Joi.validate(game, schema)
}

module.exports.TicTacToe = mongoose.model('TicTacToeGame', ticTacToeSchema)
module.exports.validateTTT = validateTTT