const chai = require('chai'),
  server = require('../../../app'),
  { should: chaiShould } = require('chai'),
  { geolocationPath } = require('../../../app/constants'),
  { ipExample, cityExample } = require('../../examples/weather'),
  config = require('../../../config'),
  nock = require('nock'),
  should = chaiShould();

describe('weather controller', () => {
  beforeEach(() => nock.cleanAll());
  describe('location', () => {
    it('Should get the current location by ip', () => {
      nock(config.common.api.ipPath)
        .persist()
        .get('/')
        .query(true)
        .reply(200, ipExample);
      nock(config.common.api.geolocationPath)
        .persist()
        .get(`${geolocationPath}/${ipExample}`)
        .query(true)
        .reply(200, { city: cityExample });
      return chai
        .request(server)
        .get('/api/location')
        .then(res => {
          res.should.have.status(200);
          res.body.body.city.should.be.equal(cityExample);
        });
    });
  });
});
