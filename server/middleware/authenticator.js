function authenticate (req, res, next) {
  console.log('authenticatin...')
  next();
}

module.exports = authenticate;