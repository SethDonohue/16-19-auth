'use strict';

require('./lib/setup');

const superagent = require('superagent');
const server = require('../lib/server');
const accountMockFactory = require('./lib/account-mock-factory');
const imageMockFactory = require('./lib/image-mock-factory');

const apiURL = `http://localhost:${process.env.PORT}`;

describe('/images', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(imageMockFactory.remove);

  test('POST /images should return a 200 status code and a image if there are no errors', () => {
    let tempAccountMock = null;
    return accountMockFactory.create()
      .then(accountMock => {
        tempAccountMock = accountMock;

        return superagent.post(`${apiURL}/images`)
          .set('Authorization', `Bearer ${accountMock.token}`)
          .field('title', 'mountains')
          .attach('image', `${__dirname}/assets/mountains.jpg`)
          .then(response => {
            console.log(response.body);
            expect(response.status).toEqual(200);
            expect(response.body.title).toEqual('mountains');
            expect(response.body._id).toBeTruthy();
            expect(response.body.url).toBeTruthy();
          });
      });
  });
});