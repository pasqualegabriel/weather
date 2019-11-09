const { getLocation, getCurrentWeather, getNextFiveDaysForecast } = require('./controllers/weather');

exports.init = app => {
  app.get('/api/v1/location', getLocation);
  app.get('/api/v1/current', getCurrentWeather);
  app.get('/api/v1/forecast', getNextFiveDaysForecast);
};
