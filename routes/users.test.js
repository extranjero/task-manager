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

    test('GET /api/v1/users', done => {
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

    test('POST /api/v1/users/auth', done => {
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
});


