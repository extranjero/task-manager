'use strict';

var winston = require('winston'),
    conf = require('./config'),
    path = require('path'),
    baseDir = path.resolve(__dirname, '..');

module.exports = getLogger

function getLogger(filename) {
    let label = path.relative(baseDir, filename);

    winston.loggers.add(label, {
        transports: [
        new winston.transports.Console({
            level: 'debug',
            prettyPrint: true,
            colorize: false,
            label: label
        }),
        new winston.transports.File({
            //required if u register two similar transports u must give them a name
            name: 'error-file',
            level: 'error',
            filename: conf.get('logger:error_file_name'),
            json: false,
            prettyPrint: true,
            colorize: false,
            label: label,
            humanReadableUnhandledException: true,
            handleExceptions: true
        }),
        new winston.transports.File({
            //required if u register two similar transports u must give them a name
            name: 'info-file',
            level: 'info',
            filename: conf.get('logger:info_file_name'),
            prettyPrint: true,
            json: false,
            colorize: false,
            label: label 
        })],
    });

    winston.exitOnError = false;

    return winston.loggers.get(label);
}
