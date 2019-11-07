const { getIp } = require('../services/ip'),
  { getLocation } = require('../services/geolocation');

exports.location = (_, res, next) =>
  getIp()
    .then(({ body: ip }) => getLocation(ip))
    .then(location => res.status(200).send(location))
    .catch(next);
