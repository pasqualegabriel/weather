const { request } = require('../helpers/request'),
  { GET, currentWeatherPath } = require('../constants'),
  config = require('../../config');

exports.getCurrentWeather = city =>
  request({
    url: `${config.common.api.currentWeatherPath}${currentWeatherPath}`,
    method: GET,
    qs: {
      q: city,
      appid: config.common.api.weatherAppid
    },
    json: true
  });
