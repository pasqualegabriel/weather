const { request } = require('../helpers/request'),
  { GET, ipPath } = require('../constants');

exports.getIp = () =>
  request({
    url: ipPath,
    method: GET,
    json: true
  });
