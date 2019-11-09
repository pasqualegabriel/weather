const chai = require('chai'),
  server = require('../../../app'),
  { should: chaiShould } = require('chai'),
  { geolocationPath, currentWeatherPath, forecastPath } = require('../../../app/constants'),
  {
    ipExample,
    cityExample,
    currentWeatherExample,
    nextFiveDaysForecastExample
  } = require('../../examples/weather'),
  config = require('../../../config'),
  nock = require('nock'),
  should = chaiShould();

describe('weather controller', () => {
  beforeEach(() => nock.cleanAll());

  const ipRouteMock = () =>
    nock(config.common.api.ipPath)
      .persist()
      .get('/')
      .query(true)
      .reply(200, ipExample);

  const ipRouteMockError = () =>
    nock(config.common.api.ipPath)
      .persist()
      .get('/')
      .query(true)
      .replyWithError(500);

  const geolocationRouteMock = () =>
    nock(config.common.api.geolocationPath)
      .persist()
      .get(`${geolocationPath}/${ipExample}`)
      .query(true)
      .reply(200, { city: cityExample });

  const geolocationRouteMockError = () =>
    nock(config.common.api.geolocationPath)
      .persist()
      .get(`${geolocationPath}/${ipExample}`)
      .query(true)
      .replyWithError(500);

  const currentWeatherRouteMock = (path, response) =>
    nock(config.common.api.currentWeatherPath)
      .persist()
      .get(path)
      .query(true)
      .reply(200, response);

  const currentWeatherRouteMockError = path =>
    nock(config.common.api.currentWeatherPath)
      .persist()
      .get(path)
      .query(true)
      .replyWithError(500);

  describe('location', () => {
    it('Should get the current location by ip', async () => {
      ipRouteMock();
      geolocationRouteMock();
      const res = await chai.request(server).get('/api/location');
      res.should.have.status(200);
      res.body.body.city.should.be.equal(cityExample);
    });
    it('Should throw an error when the ip route is not available', async () => {
      ipRouteMockError();
      const res = await chai.request(server).get('/api/location');
      res.should.have.status(500);
    });
    it('Should throw an error when the geolocation route is not available', async () => {
      ipRouteMock();
      geolocationRouteMockError();
      const res = await chai.request(server).get('/api/location');
      res.should.have.status(500);
    });
  });

  describe('current weather', () => {
    it('Should get the current weather by the current location', async () => {
      ipRouteMock();
      geolocationRouteMock();
      currentWeatherRouteMock(currentWeatherPath, currentWeatherExample);
      const res = await chai.request(server).get('/api/current');
      res.should.have.status(200);
      res.body.body.should.have.property('weather');
      res.body.body.should.have.property('wind');
      res.body.body.should.have.property('clouds');
    });
    it('Should throw an error when the current weather route is not available', async () => {
      ipRouteMock();
      geolocationRouteMock();
      currentWeatherRouteMockError(currentWeatherPath);
      const res = await chai.request(server).get('/api/current');
      res.should.have.status(500);
    });
  });

  describe('next five days forecast', () => {
    it('Should get the next five days forecast by the current location', async () => {
      ipRouteMock();
      geolocationRouteMock();
      currentWeatherRouteMock(forecastPath, nextFiveDaysForecastExample);
      const res = await chai.request(server).get('/api/forecast');
      res.should.have.status(200);
      res.body.body.should.have.property('list');
      res.body.body.list[0].should.have.property('weather');
      res.body.body.list[0].should.have.property('wind');
      res.body.body.list[0].should.have.property('clouds');
    });
    it('Should throw an error when the forecast route is not available', async () => {
      ipRouteMock();
      geolocationRouteMock();
      currentWeatherRouteMockError(forecastPath);
      const res = await chai.request(server).get('/api/forecast');
      res.should.have.status(500);
    });
  });
});
