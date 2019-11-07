const request = require('request');

exports.request = options =>
  new Promise((resolve, reject) => {
    request[options.method](options, (error, response) => (error ? reject(error) : resolve(response)));
  });
