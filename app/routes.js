const weatherController = require('./controllers/weather');

exports.init = app => {
  app.get('/api/location', weatherController.location);
};
