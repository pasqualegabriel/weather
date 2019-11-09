# Weather

#### Installing node
Get the latest version of node from the [official website](https://nodejs.org/) or using [nvm](https://github.com/creationix/nvm)
Nvm approach is preferred.

#### Getting dependencies
- ```npm install```

#### Starting your app
Now, to start your app run ```npm start``` in the rootpath of the project. Then access your app at **localhost:port**. The port is logged in the console where you ran the start script.

#### Testing your app
Now, to test your app run ```npm test``` in the rootpath of the project.

#### Environments
By default, the environment will be **development**, but you can easily change it using the **NODE_ENV** environmental variable.

#### Environment variables
`Dotenv` is used for managing environment variables. They are stored in the `/.env` file. Take into account that the variables defined in the `bashrc` are not overrided.

The environment variables should be added to the `.env` file in the form of `NAME=VALUE`, as the following example:
```
IP_PATH=http://ip-example.com
GEOLOCATION_PATH=http://geolocation-example.com
CURRENT_WEATHER_PATH=http://current-weather-example.com
WEATHER_APPID=abcdefgh
```

To get the ```appid```, you have to register in ```https://openweathermap.org/api``` and active your appid.
