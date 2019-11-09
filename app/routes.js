const { getLocation, getCurrentWeather, getForecast } = require('./controllers/weather');

exports.init = app => {
  app.get('/api/location', getLocation);
  app.get('/api/current', getCurrentWeather);
  app.get('/api/forecast', getForecast);
};
