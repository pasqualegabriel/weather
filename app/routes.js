const weatherController = require('./controllers/weather');

exports.init = app => {
  app.get('/api/location', weatherController.getLocation);
  app.get('/api/current', weatherController.getCurrentWeather);
};
