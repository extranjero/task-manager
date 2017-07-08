'use strict';

// third party modules
const express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    app = express();

// local application modules
const server_route = require('./routes/servers'),
    user_route = require('./routes/users');


app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/api/v1/servers', server_route);
app.use('/api/v1/users', user_route);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.statusCode = 404;
    err.errorId = 'not_found';
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    // render the error page
    res.status(err.statusCode || 500);
    res.json({
        'status': err.status || 'error',
        'error_id': err.errorId || null,
        'message': err.message || 'Internal server error'
    });
});

module.exports = app;

