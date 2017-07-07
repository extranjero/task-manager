'use strict';
const request = require('supertest');
const User = require('../models/user');
const app = require('../app');
const passwordUtil = require('../utils/password');

describe('Users router', () => {
    let user;
    let decryptedPassword;

    beforeEach(() => {
        user = new User({
            email: 'some@mail.ru',
            password: 'some_password',
            isAdmin: false
        });

        return passwordUtil.cryptPassword(user.password)
            .then(encryptedPassword => {
                decryptedPassword = user.password;
                user.password = encryptedPassword;

                return user.save();
            })
            .then(() => {
                return user.password = decryptedPassword;
            })
    });

    afterEach(() => {
        return User.remove({email: user.email});
    });

    describe('GET /api/v1/users', () => {
        test('can get all users', done => {
            request(app)
                .get('/api/v1/users/')
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

    describe('POST /api/v1/users/auth', () => {
        test('can auth', done => {
            request(app)
                .post('/api/v1/users/auth')
                .type('json')
                .send({
                    'email': user.email,
                    'password': user.password,
                })
                .expect(200)
                .end((err, resp) => {
                    expect(err).toEqual(null);
                    expect(resp.body.status).toEqual('success');
                    expect(resp.body.data).toBeInstanceOf(Object);
                    expect(resp.body.data.token).not.toBe(null);

                    done();
                });
        });

        test('can not authorize if user does not exists', done => {
            request(app)
                .post('/api/v1/users/auth')
                .type('json')
                .send({
                    'email': 'user_dont_exists',
                    'password': 'some_pass',
                })
                .expect(404)
                .end((err, resp) => {
                    expect(err).toEqual(null);
                    expect(resp.body.status).toEqual('fail');
                    expect(resp.body.error_id).toEqual('not_found');

                    done();
                });
        });

        test('can not authorize if user password incorrect', done => {
            request(app)
                .post('/api/v1/users/auth')
                .type('json')
                .send({
                    'email': user.email,
                    'password': 'wrong_password',
                })
                .expect(401)
                .end((err, resp) => {
                    expect(err).toEqual(null);
                    expect(resp.body.status).toEqual('fail');
                    expect(resp.body.error_id).toEqual('incorrect_password');

                    done();
                });
        });
    });
});


