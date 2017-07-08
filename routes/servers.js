'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');

const passwordUtil = require('../utils/password');
const config = require('../utils/config');
const Server = require('../models/server');

const router = express.Router();


router.get('/', function (req, res, next) {
    Server 
        .find({})
        .then(servers => {
            res.json({
                status: 'success',
                data: servers 
            });
        })
        .catch(err => {
            next(err);
        });
});

router.post('/', function (req, res, next) {
    // TODO should be used validator
    let server = new Server({
        name: req.body.name, 
        host: req.body.host, 
        userName: req.body.userName, 
        port: req.body.port, 
        keyFile: req.body.keyFile, 
        //TODO Should crypted 
        password: req.body.password, 
    });

    server.save()
        .then((user)=>{
         res.json({
            status: 'success',
            data: user 
        })
        .catch(err => {
            next(err);
        });

    });

});

router.get('/:id', function (req, res, next) {
    Server 
        .findOne({
            _id: req.params.id
        })
        .then(server => {
            if (!server) {
                let err = new Error('Server not found');
                err.statusCode = 404;
                err.status = 'fail';
                err.errorId = 'not_found';

                throw err;
            }

            res.json({
                status: 'success',
                data: server 
            });
        })
        .catch(err => {
            next(err);
        });
});

router.put('/:id', function (req, res, next) {
    Server 
        .findOne({
            _id: req.params.id
        })
        .then(server => {
            if (!server) {
                let err = new Error('User not found');
                err.statusCode = 404;
                err.status = 'fail';
                err.errorId = 'not_found';

                throw err;
            }

            // TODO should be used validator
            server.name = req.body.name;
            server.host = req.body.host;
            server.userName = req.body.userName;
            server.port = req.body.port;
            server.keyFile = req.body.keyFile;
            //TODO Should crypted 
            server.password = req.body.password;


            return server.save(); 
        })
        .then(server =>{
            res.json({
                status: 'success',
                data: server 
            });

        })
        .catch(err => {
            next(err);
        });
});

router.delete('/:id', function (req, res, next) {
    Server 
        .remove({
            _id: req.params.id
        })
        .then(() => {
            res.json({
                status: 'success',
            });
        })
        .catch(err => {
            next(err);
        });
});

module.exports = router;

