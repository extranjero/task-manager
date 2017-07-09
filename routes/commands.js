'use strict';

const express = require('express');

const Command = require('../models/command');
const Server = require('../models/server');
const ssh = require('../utils/ssh');

const router = express.Router();


router.get('/', function (req, res, next) {
    Command 
        .find({})
        .then(commands => {
            res.json({
                status: 'success',
                data: commands 
            });
        })
        .catch(err => {
            next(err);
        });
});

router.post('/', function (req, res, next) {
    let commands = [];
    let serverIds = req.body.serverIds || [];
    let servers;

    Server.find({
        _id: {$in: serverIds}  
    }).then(svs => {
        servers = svs;

        console.log('servers: ', servers);

        if(servers.length < 1) {
            let err = new Error('Any server found by given ids');
            err.statusCode = 400;
            err.status = 'fail';
            err.errorId = 'data_validation';

            throw err;
        }

        let promises = [];
        for(let i=0; i < servers.length; i++) {
            let server = servers[i];

            promises.push(ssh({
                host: server.host, 
                user: server.userName, 
                port: server.port, 
                keyFile: server.keyFile, 
                //TODO Should be crypted 
                pass: server.password, 
                command: 'echo "Hello world"'
            }));
        }

        return Promise.all(promises);
    })
    .then(results => {
        if(servers.length < 1) {
            let promises = [];
        }

        for(let i=0; i < results.length; i++) {
            let result = results[i];

            promises.push(new Command({
                name: req.body.name,
                command: req.body.command,
                serverId: servers[i]._id,
                exitCode: result.code,
                stderr: result.stderr,
                stdout: result.stdout,
                startedAt: result.startedAt,
                finishedAt: result.finishedAt,
            }).save());
        }

        return promises;
    })
    .then(results => {
        res.json({
            status: 'success',
            data: results,
        });
    })
});

router.get('/:id', function (req, res, next) {
    Command 
        .findOne({
            _id: req.params.id
        })
        .then(command => {
            if (!command) {
                let err = new Error('Server not found');
                err.statusCode = 404;
                err.status = 'fail';
                err.errorId = 'not_found';

                throw err;
            }

            res.json({
                status: 'success',
                data: command 
            });
        })
        .catch(err => {
            next(err);
        });
});

router.delete('/:id', function (req, res, next) {
    Command 
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

