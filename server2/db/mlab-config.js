let mongoose = require('mongoose');
let Debug = require('debug')('server/db/mlab-config.js');

let connectionString = 'mongodb://admin:hunter2@ds062448.mlab.com:62448/gamebox'

mongoose.connect(connectionString)
  .then(() => Debug('Connected to database'))
  .catch((err) => console.error('Could not connect to database', err))

mongoose.connect(connectionString, )
