const express = require('express');
const Joi = require('joi');
const router = express.Router();

const games = [
  { id: 1, game: "tic tac toe" },
  { id: 2, game: "connect 4" },
  { id: 3, game: "chess" },
]

router.get('', (req, res) => {
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

  const { error } = validateGame(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const game = {
    id: games.length + 1,
    game: req.body.game
  }
  games.push(game);
  res.send(game);
})

router.put('/:id', (req, res) => {
  const game = games.find(g => g.id === Number.parseInt(req.params.id))
  if (!game) {
    return res.status(404).send('The game with the given id was not found')
  }

  const { error } = validateGame(req.body);
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

function validateGame(game) {
  const schema = {
    game: Joi.string().min(3).required()
  }

  return Joi.validate(game, schema)
}

module.exports = router