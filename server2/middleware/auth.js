const jwt = require('jsonwebtoken');
const config = require('config')

function auth(req, res, next) {
  const token = req.header('x-auth-token');
  if(!token)
    return res.status(401).send('Access Denied.  No token provided')
  
  try {
    const decoded = jwt.verify(token, config.get('gridbox_jwtPrivateKey')) 
    req.user = decoded
    next();
  }
  catch(ex) {
    res.status(400).res.send('Invalid token');
  }
}

module.exports = auth;