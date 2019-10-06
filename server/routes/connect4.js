const express = require('express');
const router = express.Router();
const { determineWinner, antiCheat, formatBoard, validateC4, Connect4 } = require('../models/connect4');
const Debug = require('debug')('connect4_route');

router.get('/:id', async (req, res) => {
  let game = await Connect4.findById(req.params.id)
  if (!game)
    return res.status(400).send('The game with the given id does not exist')
  
  res.send(game)
})

router.post('/', async (req, res) => {
  const { error } = validateC4(req.body)
  if (error)
    return res.status(400).send(error.details[0].message)

  Debug(`Game received :: ${JSON.stringify(req.body, null, 2)}`)

  let game = await Connect4.create(req.body);
  if (!game)
    return res.status(400).send('something went wrong')
  
  res.send({message: 'Game successfully created', _id: game._id})
})

router.put('/:id', async (req, res) => {
  const { error } = validateC4(req.body);
  if (error)
    return res.status(400).send(error.details[0].message)
  
  formatBoard(req.body);
  determineWinner(req.body);

  Debug(`Game received :: ${JSON.stringify(req.body, null, 2)}`)

  let game = await Connect4.findById(req.params.id)
  if (!game)
    return res.status(400).send('The game with the given id does not exist')
  
  let fairGame = antiCheat(req.body.board, game.board)
  fairGame ? '' : res.status(400).send('Invalid board state');

  await game.update(req.body);
  res.send({message: "Game successfully updated", _id: game._id})

})

router.delete('/:id', async (req, res) => {
  let game = Connect4.findById(req.params.id)
  if (!game)
    return res.status(400).send('The game with the given id does not exist')
  
  let deletedGame = await game.remove()
  if (!deletedGame)
    return res.status(400).send(`Something went wrong, game NOT deleted`)
  
  return res.send(`Successfully deleted`)
})

module.exports = router;