const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 15,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024
  }
})

// userSchema.methods.generateAuthToken = function () {
//   return jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
// }

const User = mongoose.model('User', userSchema)

const validateUser = (user) => {
  const schema = {
    name: Joi.string().min(3).max(15).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(255).required()
  }
  return Joi.validate(user, schema)
}

const validateLogin = (user) => {
  const schema = {
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(255).required()
  }
  return Joi.validate(user, schema)
}
module.exports = {
  validateUser: validateUser,
  User: User,
  validateLogin: validateLogin
}