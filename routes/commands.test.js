'use strict';
const request = require('supertest');
const User = require('../models/user');
const Server = require('../models/server');
const app = require('../app');
const config = require('../utils/config');

describe('Severs router', () => {
    let server, command;

    beforeEach(() => {
        server = new Server({
            name: 'server_name', 
            host: config.get('ssh:host'), 
            userName: config.get('ssh:user'), 
            port: config.get('ssh:port'), 
            password: config.get('ssh:password'), 
        });

        return server.save();
    });

    afterEach(() => {
        return Server.remove({_id: server._id});
    });

    describe('POST /api/v1/commands', () => {
        test('can run new command on selected servers', done => {
            request(app)
                .post('/api/v1/commands/')
                .type('json')
                .send({
                    name: 'List command',
                    command: 'ls -l',
                    serverIds: [server._id],
                })
                .expect(200)
                .end((err, resp) => {
                    expect(err).toEqual(null);
                    expect(resp.body.status).toEqual('success');
                    expect(resp.body.data).toBeInstanceOf(Array);
                    expect(resp.body.data.length).toBeGreaterThanOrEqual(1);
                    expect(resp.body.data[0].exitCode).toEqual(0);

                    command = resp.body.data[0];

                    done();
                });
        }, 15000);
    });

    describe('GET /api/v1/commands', () => {
        test('can get all commands', done => {
            request(app)
                .get('/api/v1/commands/')
                .expect(200)
                .end((err, resp) => {
                    expect(err).toEqual(null);
                    expect(resp.body.status).toEqual('success');
                    expect(resp.body.data).toBeInstanceOf(Array);
                    expect(resp.body.data.length).toBeGreaterThanOrEqual(1);

                    done();
                });
        });
    });

    describe('GET /api/v1/commands/:id', () => {
        test('can get command by id', done => {
            request(app)
                .get('/api/v1/commands/' + command._id)
                .expect(200)
                .end((err, resp) => {
                    expect(err).toEqual(null);
                    expect(resp.body.status).toEqual('success');
                    expect(resp.body.data).toBeInstanceOf(Object);

                    done();
                });
        });
    });
    
    describe('DELETE /api/v1/commands/:id', () => {
        test('can delete command by id', done => {
            request(app)
                .delete('/api/v1/commands/' + command._id)
                .expect(200)
                .end((err, resp) => {
                    expect(err).toEqual(null);
                    expect(resp.body.status).toEqual('success');

                    done();
                });
        });
    });

    
});
