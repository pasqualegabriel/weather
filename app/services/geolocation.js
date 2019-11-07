const { request } = require('../helpers/request'),
  { GET, geolocationPath } = require('../constants');

exports.getLocation = ip =>
  request({
    url: `${geolocationPath}${ip}`,
    method: GET,
    json: true
  });
