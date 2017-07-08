'use strict';
const request = require('supertest');
const User = require('../models/user');
const app = require('../app');
const passwordUtil = require('../utils/password');

describe('Severs router', () => {
    let server;

    describe('POST /api/v1/servers', () => {
        test('can create new server', done => {
            request(app)
                .post('/api/v1/servers/')
                .type('json')
                .send({
                    name: 'MyServer',
                    host: 'localhost',
                    userName: 'ubuntu',
                    port: 22,
                    keyFile: '',
                    password: 'pass',
                })
                .expect(200)
                .end((err, resp) => {
                    expect(err).toEqual(null);
                    expect(resp.body.status).toEqual('success');
                    expect(resp.body.data).toBeInstanceOf(Object);

                    server = resp.body.data;

                    done();
                });
        });
    });

    describe('GET /api/v1/servers', () => {
        test('can get all servers', done => {
            request(app)
                .get('/api/v1/servers/')
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

    describe('GET /api/v1/servers/:id', () => {
        test('can get server by id', done => {
            request(app)
                .get('/api/v1/servers/' + server._id)
                .expect(200)
                .end((err, resp) => {
                    expect(err).toEqual(null);
                    expect(resp.body.status).toEqual('success');
                    expect(resp.body.data).toBeInstanceOf(Object);

                    done();
                });
        });
    });

    describe('PUT /api/v1/servers/:id', () => {
        test('can update server by id', done => {
            request(app)
                .put('/api/v1/servers/' + server._id)
                .type('json')
                .send(server)
                .expect(200)
                .end((err, resp) => {
                    expect(err).toEqual(null);
                    expect(resp.body.status).toEqual('success');
                    expect(resp.body.data).toBeInstanceOf(Object);

                    done();
                });
        });
    });

    describe('POST /api/v1/servers/test', () => {
        test('can test server connection', done => {
            request(app)
                .post('/api/v1/servers/test')
                .type('json')
                .send({
                    name: 'MyServer',
                    host: 'localhost',
                    userName: 'abdullo',
                    port: 22,
                    password: 'mko',
                })
                .expect(200)
                .end((err, resp) => {
                    expect(err).toEqual(null);
                    expect(resp.body.status).toEqual('success');
                    expect(resp.body.data).toBeInstanceOf(Object);

                    done();
                });
        }, 15000);
    });

    describe('DELETE /api/v1/servers/:id', () => {
        test('can delete server by id', done => {
            request(app)
                .delete('/api/v1/servers/' + server._id)
                .expect(200)
                .end((err, resp) => {
                    expect(err).toEqual(null);
                    expect(resp.body.status).toEqual('success');

                    done();
                });
        });
    });

    
});
