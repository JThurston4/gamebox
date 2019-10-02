const { User, validateLogin, validateUser } = require('../models/user');
const jwt = require('jsonwebtoken');
const session = require('../db/session');
const auth = require('../middleware/auth');
const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
// const _ = require('lodash');
const bcrypt = require('bcrypt');
const router = express.Router()
const Debug = require('debug')('server/routes/users.js');


router.get('/me', async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
})

router.post('/register', async (req, res) => {
  const { error } = validateUser(req.body)
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
  req.session.uid = user._id
  req.session.name = user.name
  delete user._doc.password;
  
  res.send(user)
  // res.send(_.pick(user, ['_id', 'name', 'email']))
})

router.post('/login', async (req, res) => {
  const { error } = validateLogin(req.body)
  if (error)
    return res.status(400).send(error.details[0].message + 'ruh roh');
  let user = await User.findOne({ email: req.body.email })
  if (!user)
    return res.status(400).send('Invalid email or password')
  
  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword)
    return res.status(400).send('Invalid email or password')

  req.session.uid = user._id;
  req.session.name = user.name;
  
  Debug(`user :: $${user}`)
  
  await user.save()
  delete user._doc.password;

  // res.send(_.pick(user, ['_id', 'name', 'email']))
  res.send(user)
})

router.delete('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.send(err)
    }
    return res.send('Logout successful')
  })
})

router.get('/authenticate', async (req, res) => {
  let user = await User.findById(req.session.uid);
  if (!user) 
    return res.status(401).send('Please login to continue')
  
  delete user._doc.password;
  res.send(user)
})

module.exports = {router, session}