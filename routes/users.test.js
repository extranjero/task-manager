'use strict';
const request = require('supertest');
const User = require('../models/user');
const app = require('../app');

describe('Users router', () => {
    let user = new User({
        email: 'some@mail.ru',
        password: 'some_password',
        isAdmin: false
    });

    beforeEach(() => {
        return user.save();
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
});


