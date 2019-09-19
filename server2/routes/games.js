const express = require('express');
const Joi = require('joi');
const router = express.Router();
const TttGame = require('../models/ticTacToe')

const games = [
  { id: 1, game: "tic tac toe" },
  { id: 2, game: "connect 4" },
  { id: 3, game: "chess" },
]

router.get('/', (req, res) => {
  res.send([1, 2, 3, 4, 5])
})

router.get('/:id', (req, res) => {
  const game = games.find(g => g.id === Number.parseInt(req.params.id))
  if (!game) {
    return res.status(404).send('The game with the given id was not found')
  }
  res.send(game.game)
})


router.post('', (req, res) => {
  const { error } = validateTTT(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  TttGame.create(req.body)
    .then(newGame => {
      res.send(newGame);
    })
    .catch(err => {
      console.log(err);
  })
})

router.put('/:id', (req, res) => {
  const game = games.find(g => g.id === Number.parseInt(req.params.id))
  if (!game) {
    return res.status(404).send('The game with the given id was not found')
  }

  const { error } = validateTTT(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  game.game = req.body.game;
  res.send(game);
})

router.delete('/:id', (req, res) => {
  const game = games.find(g => g.id === Number.parseInt(req.params.id))
  if (!game) {
    res.status(404).send('The game with the given id was not found')
  }

  const index = games.indexOf(game)
  games.splice(index, 1)

  res.send(game)
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

module.exports = router