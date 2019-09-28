const { User, validate } = require('../models/user');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const router = express.Router()


router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
})

router.post('/', async (req, res) => {
  const { error } = validate(req.body)
  if (error)
    return res.status(400).send(error.details[0].message)
  
  let user = await User.findOne({ email: req.body.email })
  if (user)
    return res.status(400).send('Email already registered');
  
  user = await User.findOne({ name: req.body.name })
  if (user)
    return res.status(400).send('Username taken')
  
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
  // same thing
  // user = new User(_.pick(req.body, ['name', 'email', 'password']))
  
  const salt = await bcrypt.genSalt(10);
  // @ts-ignore
  user.password = await bcrypt.hash(user.password, salt)

  await user.save();
  // @ts-ignore
  const token = user.generateAuthToken()

  res.header('x-auth-token', token).send(_.pick(user,['_id', 'name', 'email']))

})

module.exports = router