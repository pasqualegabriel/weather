const { request } = require('../helpers/request'),
  { GET } = require('../constants'),
  config = require('../../config');

exports.getIp = () =>
  request({
    url: config.common.api.ipPath,
    method: GET,
    json: true
  });
