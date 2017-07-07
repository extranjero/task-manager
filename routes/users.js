'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passwordUtil = require('../utils/password');
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function (req, res) {
    User.find({}).select({_id: 1, email: 1}).exec((err, users) => {
        if (err) {
            res.status(500);
            return res.json({
                status: 'error',
                message: 'Internal server error',
            })
        }

        return res.json({
            status: 'success',
            data: users,
        });
    })
});

module.exports = router;
