"use strict";

const request = require("superagent")

const REDIS_URL = 'https://wx0himl2kd.execute-api.us-east-1.amazonaws.com/prod'
const MEMCACHED_URL = 'https://u377i3mli2.execute-api.us-east-1.amazonaws.com/prod'

beforeAll(done => {
    request
        .post(`${REDIS_URL}/reset-redis`)
        .end(function(err, res) {
            expect(res.status).toBe(200)
            done()
        })
})

beforeAll(done => {
    request
        .post(`${MEMCACHED_URL}/reset-memcached`)
        .end(function(err, res) {
            if (err) throw err
            expect(res.status).toBe(200)
            done()
        })
})

it('Charges under 25ms with redis @TODO',  (done) => {
    request
        .post(`${REDIS_URL}/charge-request-redis`)
        .send({ serviceType: "voice", unit: 3 })
        .end(function(err, res) {
            if (err) throw err
            expect(res.status).toBe(200)
            console.log(`REDIS RESPONSE TIME: ${res.body.duration}ms`);
            done()
        })
});

it('Charges under 25ms with memcached @TODO',  (done) => {
    request
        .post(`${REDIS_URL}/charge-request-redis`)
        .send({ serviceType: "voice", unit: 3 })
        .end(function(err, res) {
            expect(res.status).toBe(200)
            console.log(`MEMCACHED RESPONSE TIME: ${res.body.duration}ms`);
            done()
        })
});