const { request } = require('../helpers/request'),
  { GET, geolocationPath } = require('../constants'),
  config = require('../../config');

exports.getLocation = ip =>
  request({
    url: `${config.common.api.geolocationPath}${geolocationPath}/${ip}`,
    method: GET,
    json: true
  });
