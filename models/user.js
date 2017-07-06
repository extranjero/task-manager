'use strict';

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var db = require('../utils/db') 
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = db.model('User', new Schema({ 
    email: String, 
    password: String, 
    isAdmin: Boolean 
}));
