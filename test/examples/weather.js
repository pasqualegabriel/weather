exports.ipExample = '182.164.252.101';

exports.cityExample = 'Quilmes';

exports.currentWeatherExample = {
  weather: [
    {
      id: 802,
      main: 'Clouds',
      description: 'scattered clouds',
      icon: '03d'
    }
  ],
  wind: {
    speed: 8.2,
    deg: 100
  },
  clouds: {
    all: 40
  }
};

exports.nextFiveDaysForecastExample = { list: [exports.currentWeatherExample] };
