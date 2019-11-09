const ENVIRONMENT = process.env.NODE_ENV || 'development';

if (ENVIRONMENT !== 'production') {
  require('dotenv').config();
}

const configFile = `./${ENVIRONMENT}`;

const isObject = variable => {
  return variable instanceof Object;
};

/*
 * Deep copy of source object into tarjet object.
 * It does not overwrite properties.
 */
const assignObject = (target, source) => {
  if (target && isObject(target) && source && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (!Object.prototype.hasOwnProperty.call(target, key)) {
        target[key] = source[key];
      } else {
        assignObject(target[key], source[key]);
      }
    });
    return target;
  }
};

// .env
const config = {
  common: {
    api: {
      ipPath: process.env.IP_PATH,
      geolocationPath: process.env.GEOLOCATION_PATH,
      currentWeatherPath: process.env.CURRENT_WEATHER_PATH,
      weatherAppid: process.env.WEATHER_APPID
    }
  }
};

const customConfig = require(configFile).config;
module.exports = assignObject(customConfig, config);
