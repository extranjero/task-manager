'use strict';

// third party modules
var express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    app = express();

// local application modules
var index = require('./routes/index'),
    config = require('./utils/config'),
    log = require('./utils/logger')(__filename),
    users = require('./routes/users');


app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(config.get('port'), () => {
    log.info("task manager started at " + config.get('port'))
});

