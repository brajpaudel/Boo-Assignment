'use strict';

const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const connectDb = require('./utlis/database');
const routes = require('./routes/v1/index');
// set the view engine to ejs
app.set('view engine', 'ejs');

connectDb();

app.use(logger('dev'));
app.use(bodyParser.json({ limit: '20mb' }));
app.use('/api/v1/', routes);
app.use('/profile', require('./routes/profile'));
app.use('/public', express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//error handler
app.use((err, req, res, next) => {
  if (err && err.status != 404) {
    console.log('Server Error', err);
  }
  res.status(err.status || 500);
  res.json({
    title: err.title || 'Internal server error',
    message: err.message,
    data: [],
  });
});

module.exports = app;
