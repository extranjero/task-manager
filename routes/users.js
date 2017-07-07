'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passwordUtil = require('../utils/password');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

/* GET users listing. */
router.get('/', function (req, res, next) {
    User
        .find({})
        .select({_id: 1, email: 1})
        .then(users => {
            res.json({
                status: 'success',
                data: users
            });
        })
        .catch(err => {
            next(err);
        })
});

router.post('/auth', function (req, res, next) {
    User
        .findOne({
            email: req.body.email,
        })
        .then(user => {
            if (!user) {
                let err = new Error('User not found');
                err.statusCode = 404;
                err.status = 'fail';
                err.errorId = 'not_found';

                throw err;
            }

            console.log('req: ', user);

            return Promise.all([
                user,
                passwordUtil.comparePassword(req.body.password, user.password),
            ]);
        })
        .then((results) => {
            let user = results[0];
            let passwordsMatch = results[1];

            if (!passwordsMatch) {
                let err = new Error('Incorrect password');
                err.statusCode = 401;
                err.status = 'fail';
                err.errorId = 'incorrect_password';

                throw err;
            }

            let tokenData = {
                userId: user._id,
                userEmail: user.email,
                isAdmin: user.isAdmin
            };

            let token = jwt.sign(tokenData, config.get('secret'));

            res.json({
                'status': 'success',
                data: {
                    token: token
                }
            })
        })
        .catch(err => {
            next(err);
        });
});

module.exports = router;
