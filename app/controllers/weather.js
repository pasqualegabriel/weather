const { getIp } = require('../services/ip'),
  { getLocation } = require('../services/geolocation'),
  { currentWeatherPath, forecastPath } = require('../constants'),
  { getWeather } = require('../services/weather');

const getCurrentLocation = () => getIp().then(({ body: ip }) => getLocation(ip));

exports.getLocation = (_, res, next) =>
  getCurrentLocation()
    .then(location => res.status(200).send(location))
    .catch(next);

exports.getCurrentWeather = (_, res, next) =>
  getCurrentLocation()
    .then(({ body: { city } }) => getWeather(city, currentWeatherPath))
    .then(weather => res.status(200).send(weather))
    .catch(next);

exports.getForecast = (_, res, next) =>
  getCurrentLocation()
    .then(({ body: { city } }) => getWeather(city, forecastPath))
    .then(weather => res.status(200).send(weather))
    .catch(next);
