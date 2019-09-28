const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const { validateTTT, TicTacToe } = require('../models/ticTacToe');

router.get('/', (req, res) => {
  res.send([1, 2, 3, 4, 5])
})

router.get('/:id', (req, res) => {
  TicTacToe.findById(req.params.id)
    .then((game) => {
      res.send(game);
    })
    .catch (() => res.status(404).send("The game with the given id does not exist"))
})


router.post('', auth, (req, res) => {
  const { error } = validateTTT(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  TicTacToe.create(req.body)
    .then(newGame => {
      res.send(newGame);
    })
    .catch(() => res.status(404).send("Something went wrong"))
})

router.put('/:id', (req, res) => {
  const { error } = validateTTT(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  // TicTacToe.findByIdAndUpdate(req.params.id, req.body)
  //   .then((gamee) => res.send(gamee))
  //   .catch((err => console.log(err)))
  TicTacToe.findById(req.params.id)
    .then((game) => {
      game.update(req.body, (err) => { return console.log(err) })
      res.send(game)
    })
  .catch(() => res.status(404).send("The game with the given id does not exist"))
})

router.delete('/:id', (req, res) => {
  // const game = games.find(g => g.id === Number.parseInt(req.params.id))
  // if (!game) {
  //   res.status(404).send('The game with the given id was not found')
  // }

  TicTacToe.findById(req.params.id)
    .then((game) => {
      game.remove((err) => { return console.log(err) })
      res.send("Sucessfully Deleted")
    })
    .catch(() => res.status(404).send("The game with the given id does not exist"))
})

module.exports = router