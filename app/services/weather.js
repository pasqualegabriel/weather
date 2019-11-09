const { request } = require('../helpers/request'),
  { GET } = require('../constants'),
  config = require('../../config');

exports.getWeather = (city, path) =>
  request({
    url: `${config.common.api.currentWeatherPath}${path}`,
    method: GET,
    qs: {
      q: city,
      appid: config.common.api.weatherAppid
    },
    json: true
  });
