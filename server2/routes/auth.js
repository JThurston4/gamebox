'use strict'
const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const express = require('express');
const _ = require('lodash');
const { User } = require('../models/user')
const bcyrpt = require('bcrypt');
const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res.status(400).send(error.details[0].message);
  
  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send('Invalid email or password');

  // @ts-ignore
  const validPassword = await bcyrpt.compare(req.body.password, user.password) 
  if (!validPassword) 
    return res.status(400).send('Invalid email or password');
  
  // @ts-ignore
  const token = user.generateAuthToken();
  
  res.send(token);
  
})

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(6).max(255).required()
  }

  return Joi.validate(req, schema)
}

module.exports = router;