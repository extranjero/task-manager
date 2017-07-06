var mongoose = require('mongoose');

var config = require('../utils/config');


var options = { promiseLibrary: require('bluebird') };
var uri = config.get('db_uri');

var db = mongoose.createConnection(uri, options);

db.on('open', function() {

});

module.exports = db;
