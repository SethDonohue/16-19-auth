'use strict';

require('./lib/setup');
const superagent = require('superagent');
const server = require('../lib/server');
const accountMock = require('./lib/account-mock-factory');
const profileMock = require('./lib/profile-mock-factory');

const apiURL = `http://localhost:${process.env.PORT}`;

describe('Profile Router', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(profileMockFactory.remove);

  describe('POST/profiles', () => {
    //TODO: Write 200, test for POST / profiles
    test('Should return a 200 and a profile if there are no errors', () => {
      let accountMock = null;

      return accountMockFactory.create()
        .then(mock => {
          accountMock = mock;
          return superagent.post(`${apiURL}/profiles`)
            .set('Authorization', `Bearer ${accountMock.token}`)//headers
            .send({
              bio: 'I am stupider',
              firstName: 'Cheif',
              lastName: 'Stupid',

            }); //body
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.account).toEqual(
            accountMock.account._id.toString());
          expect(response.body.firstName).toEqual('Cheif');
          expect(response.body.lastName).toEqual('Stupid');
          expect(response.body.bio).toEqual('I am stupider');
        });
    });

    //TODO: Write 400, test for POST / profiles

    //TODO: Write 401, test for POST / profiles

  });

  describe('GET/profiles', () => {

    //TODO: Write 200, test for POST / profiles

    //TODO: Write 400, test for POST / profiles

    //TODO: Write 401, test for POST / profiles

  });
});