'use strict';

require('./lib/setup');
const superagent = require('superagent');
const server = require('../lib/server');
const accountMock = require('./lib/account-mock-factory');

const apiURL = `http://localhost:${process.env.PORT}`;

describe('Account Router', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(accountMockFactory.remove);

  describe('POST /signup', () => {
    test('POST creating an account should respond with 200 and a token if there are no errors', () => {
      return superagent.post(`${apiURL}/signup`)
        .send({
          username: 'stupid',
          email: 'stupid@stupider.com',
          password: 'catstuffs',
        })
        .then(response => {
          console.log(response.body);
          expect(response.status).toEqual(200);
          expect(response.body.token).toBeTruthy();
        });
    });

    test('POST /signup - an incomplete request should return a 400', () => {
      return superagent.post(`${apiURL}/signup`)
        .send({
          username: 'stupid',
          email: 'stupid@stupider.com',
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(400);
        });
    });

    test('POST /signup - a duplate request should return a 409', () => {
      return superagent.post(`${apiURL}/signup`)
        .send({
          username: 'stupid',
          email: 'stupid@stupider.com',
          password: 'catstuffs',
        })
        .then(() => {
          return superagent.post(`${apiURL}/signup`)
            .send({
              username: 'stupid',
              email: 'stupid@stupider.com',
              password: 'catstuffs',
            });
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(409);
        });
    });
  });

  describe('GET /login', () => {
    test('GET /login should get a 200 status code and a token if there are no errors', () => {
      return accountMockFactory.create()
        .then(mock => {
          return superagent.get(`${apiURL}/login`)
            .auth(mock.request.username, mock.request.password);
        })
        .then(response => {
          console.log(response.body);
          expect(response.status).toEqual(200);
          expect(response.body.token).toBeTruthy();
        });
    });

    //TODO: WRITE 400 TEST

    //TODO: WRITE 401 TEST
  });
});