'use strict';

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var db = require('../utils/db') 
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = db.model('Server', new Schema({ 
    name: String, 
    host: String, 
    userName: String, 
    port: Number, 
    keyFile: String, 
    password: String, 
}));
