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