const express = require('express');
const Joi = require('joi');
const logger = require('./middleware/logger.js');
const authenticator = require('./middleware/authenticator.js');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const Debug = require('debug')('server/index.js');
const games = require('./routes/games.js');
const home = require('./routes/home.js');

const app = express(); 

app.use(express.json());
app.use(helmet());
app.use(logger);
app.use(authenticator);

require('./db/mlab-config.js');

app.use('/', home);
app.use('/api/games', games);
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