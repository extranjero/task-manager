'use strict';

// third party modules
var readline = require('readline');

var config = require('../utils/config'),
    User = require('../models/user'),
    passwordUtil = require('../utils/password');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


var email, password;

rl.question('Utility for creating admin user. !!! It will not check existance of duplicate emails!!!. \n \
            Enter the admin email: ', (answer) => {
    if(answer === "") {
        throw Error(`Invalid email: ${answer}`);
    }
    email = answer;

    rl.question('Enter the admin password: ', (answer) => {
        if(answer === "") {
            throw Error(`Invalid email: ${answer}`);
        }
        
        password = answer;

        passwordUtil.cryptPassword(password, (err, encryptedPassword) => {
            var admin = new User({
                email: email,
                password: encryptedPassword,
                isAdmin: true
            });

            admin.save().catch((err) => {
                if (err) throw err;
            })

            rl.close();
        })

    });
});




