const express = require('express');
const logger = require('./middleware/logger.js');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const Debug = require('debug')('server/index.js');
const ticTacToe = require('./routes/ticTacToe.js');
const home = require('./routes/home.js');
const user = require('./routes/users');
const auth = require('./routes/auth');
const cors = require('cors');

const app = express(); 

if (!config.get('privateKey')) {
  console.log(`FATAL ERROR: jwtPrivateKey is not defined.`)
  process.exit(1);
}

var whitelist = ['http://localhost:8080'];
var corsOptions = {
  origin: function (origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true
};
app.use(cors(corsOptions))

app.use(express.json());
app.use(helmet());
app.use(logger);

require('./db/mlab-config.js');

app.use('/', home);
app.use(user.session)
app.use('/api/users', user.router);

app.use((req, res, next) => {
  if (!req.session.uid) {
    return res.status(401).send({
      error: 'please login to continue'
    })
  }
  next()
})

app.use('/api/games/tictactoe', ticTacToe);
app.use('/api/auth', auth);
// console.log(`Application Name: ${config.get('name')}`)
console.log('Application Name: '+ config.get('name'))

console.log(`NODE_ENV is ${process.env.NODE_ENV}`)
console.log(`app:: ${app.get('env')}`);

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  Debug('morgan enabled')
}







const port = process.env.PORT || 9001
app.listen(port, () => console.log(`listening on port ${port}`));