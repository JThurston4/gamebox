const mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;

const ticTacToeSchema = new mongoose.Schema({
  board: { type: Array, required: true, default: [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]]},
  // author: { type: ObjectId, ref: 'User', required: true },
  created: { type: Date, required: true, default: Date.now() },
  lastSaved: { type: Date, default: Date.now() },
  playerOneTurn: { type: Boolean, required: true}
})

module.exports = mongoose.model('TttGame', ticTacToeSchema)