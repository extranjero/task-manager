var bcrypt = require('bcrypt');

exports.cryptPassword = cryptPassword;
exports.comparePassword = comparePassword;
    
function cryptPassword(password, callback) {
    var salt = bcrypt.genSaltSync();

    bcrypt.hash(password, salt, function(err, hash) {
      return callback(err, hash);
    });
};


function comparePassword(password, userPassword, callback) {
   bcrypt.compare(password, userPassword, function(err, isPasswordMatch) {
      if (err) 
        return callback(err);
      return callback(null, isPasswordMatch);
   });
};
