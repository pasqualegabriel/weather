const errors = require('../errors');

const DEFAULT_STATUS_CODE = 500;

const statusCodes = {
  [errors.NOT_FOUND_ERROR]: 404,
  [errors.DEFAULT_ERROR]: 500
};

exports.notFound = (req, res) =>
  res.status(404).send({
    message: 'Route not found'
  });

exports.handle = (error, req, res, next) =>
  error.internalCode
    ? res.status(statusCodes[error.internalCode] || DEFAULT_STATUS_CODE)
    : res.status(DEFAULT_STATUS_CODE).send({ message: error.message, internal_code: error.internalCode });
