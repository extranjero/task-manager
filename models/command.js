'use strict';

var mongoose = require('mongoose');
var db = require('../utils/db') 
var Schema = mongoose.Schema;

module.exports = db.model('Command', new Schema({ 
    name: String, 
    command: String, 
    serverId: Schema.types.ObjectId, 
    exitCode: Number, 
    stdout: String, 
    stderr: String, 
    startedAt: Date, 
    finishedAt: Date, 
}));
