const expressSession = require('express-session');
const config = require('config');
const mongoStore = require('connect-mongodb-session')(expressSession);

const store = new mongoStore({
  uri: 'mongodb://admin:hunter2@ds062448.mlab.com:62448/gamebox',
  collection: 'Sessions'
})

store.on("error", function (err) {
  console.log("[SESSION ERROR]", )
})

const session = expressSession({
  secret: config.get('privateKey'),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 90
  },
  store,
  resave: true,
  saveUninitialized: true
});

module.exports = session