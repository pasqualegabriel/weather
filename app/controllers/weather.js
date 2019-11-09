const { getLocation } = require('../services/geolocation'),
  { currentWeatherPath, forecastPath } = require('../constants'),
  { getWeather } = require('../services/weather');

exports.getLocation = (_, res, next) =>
  getLocation()
    .then(location => res.status(200).send(location))
    .catch(next);

exports.getCurrentWeather = (_, res, next) =>
  getLocation()
    .then(({ body: { city } }) => getWeather(city, currentWeatherPath))
    .then(weather => res.status(200).send(weather))
    .catch(next);

exports.getNextFiveDaysForecast = (_, res, next) =>
  getLocation()
    .then(({ body: { city } }) => getWeather(city, forecastPath))
    .then(weather => res.status(200).send(weather))
    .catch(next);
