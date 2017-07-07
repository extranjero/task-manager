'use strict';

// third party modules
const express = require('express'),
      logger = require('morgan'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      app = express();

// local application modules
const index = require('./routes/index'),
      users = require('./routes/users');


app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/api/v1/', index);
app.use('/api/v1/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.statusCode = 404;
  res.json({
      'status': 'fail',
      'message': 'Not found'
  })
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // render the error page
  res.status(err.statusCode || 500);
  res.json({
      'status': 'error',
      'message': 'Internal server error'
  });
});

module.exports = app;

