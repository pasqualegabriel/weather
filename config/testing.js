exports.config = {
  environment: 'testing',
  isTesting: true,
  common: {
    api: {
      ipPath: 'http://ip-test.com',
      geolocationPath: 'http://geolocation-test.com',
      currentWeatherPath: 'http://current-weather-test.com',
      weatherAppid: 'abcdefgh'
    }
  }
};
