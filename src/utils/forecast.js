const request = require('request');

const forecast = (location, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=b12f02b3bc1c9342c885ac102a838f5b&query=${location}&units=f`;

    request({ url, json: true }, (error, {body}) => {
        if(error){
            callback("Unable to connect to weather service!");
        }else if(body.error) {
            callback("Unable to find location. Please try another search")
        }else {
        callback(undefined ,body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + ' degrees out. There is a ' + body.current.cloudcover + ' chance of rain.');
        }
    }) 
}

module.exports = forecast;
