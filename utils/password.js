'use strict';

const bcrypt = require('bcrypt');


exports.cryptPassword = cryptPassword;
exports.comparePassword = comparePassword;

function cryptPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) return reject(err);
            resolve(hash);
        });
    });
}

function comparePassword(password, userPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, userPassword, (err, isPasswordMatch) => {
            if (err) return reject(err);
            resolve(isPasswordMatch);
        });
    });
}
