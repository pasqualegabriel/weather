const chai = require('chai'),
  server = require('../../../app'),
  { should: chaiShould } = require('chai'),
  { geolocationPath, currentWeatherPath, forecastPath } = require('../../../app/constants'),
  { ipExample, cityExample, currentWeatherExample } = require('../../examples/weather'),
  config = require('../../../config'),
  nock = require('nock'),
  should = chaiShould();

describe('weather controller', () => {
  beforeEach(() => nock.cleanAll());

  describe('location', () => {
    it('Should get the current location by ip', async () => {
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
      const res = await chai.request(server).get('/api/location');
      res.should.have.status(200);
      res.body.body.city.should.be.equal(cityExample);
    });
    it('Should throw an error when the ip route is not available', async () => {
      nock(config.common.api.ipPath)
        .persist()
        .get('/')
        .query(true)
        .replyWithError(500);
      const res = await chai.request(server).get('/api/location');
      res.should.have.status(500);
    });
    it('Should throw an error when the geolocation route is not available', async () => {
      nock(config.common.api.ipPath)
        .persist()
        .get('/')
        .query(true)
        .reply(200, ipExample);
      nock(config.common.api.geolocationPath)
        .persist()
        .get(`${geolocationPath}/${ipExample}`)
        .query(true)
        .replyWithError(500);
      const res = await chai.request(server).get('/api/location');
      res.should.have.status(500);
    });
  });

  describe('current weather', () => {
    it('Should get the current weather by the current location', async () => {
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
      nock(config.common.api.currentWeatherPath)
        .persist()
        .get(currentWeatherPath)
        .query(true)
        .reply(200, currentWeatherExample);
      const res = await chai.request(server).get('/api/current');
      res.should.have.status(200);
      res.body.body.should.have.property('weather');
      res.body.body.should.have.property('visibility');
      res.body.body.should.have.property('wind');
      res.body.body.should.have.property('clouds');
    });
    it('Should throw an error when the current weather route is not available', async () => {
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
      nock(config.common.api.currentWeatherPath)
        .persist()
        .get(currentWeatherPath)
        .query(true)
        .replyWithError(500);
      const res = await chai.request(server).get('/api/current');
      res.should.have.status(500);
    });
  });
});
