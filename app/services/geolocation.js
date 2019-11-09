const { request } = require('../helpers/request'),
  { GET, geolocationPath } = require('../constants'),
  { getIp } = require('../services/ip'),
  config = require('../../config');

exports.getLocation = () =>
  getIp().then(({ body: ip }) =>
    request({
      url: `${config.common.api.geolocationPath}${geolocationPath}/${ip}`,
      method: GET,
      json: true
    })
  );
