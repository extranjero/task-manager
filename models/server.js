'use strict';

var mongoose = require('mongoose');
var db = require('../utils/db') 
var Schema = mongoose.Schema;

module.exports = db.model('Server', new Schema({ 
    name: String, 
    host: String, 
    userName: String, 
    port: Number, 
    keyFile: String, 
    password: String, 
}));
