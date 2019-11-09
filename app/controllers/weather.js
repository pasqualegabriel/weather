const { getIp } = require('../services/ip'),
  { getLocation } = require('../services/geolocation'),
  { getCurrentWeather } = require('../services/weather');

exports.getLocation = (_, res, next) =>
  getIp()
    .then(({ body: ip }) => getLocation(ip))
    .then(location => res.status(200).send(location))
    .catch(next);

exports.getCurrentWeather = (_, res, next) =>
  getIp()
    .then(({ body: ip }) => getLocation(ip))
    .then(({ body: { city } }) => getCurrentWeather(city))
    .then(weather => res.status(200).send(weather))
    .catch(next);
