const request = require("request");


const forecast = (longitude, latitude, callback) => {
    
    const url = "http://api.weatherstack.com/current?access_key=888847358158130b7b76e4d4e06209dd&query=" + encodeURIComponent(latitude) + "," + encodeURIComponent(longitude);
    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error)
        {
            callback("Could not connect to the server. ERROR", undefined);
        }
        else if(response.body.error)
        {
            callback("Wrong location. ERROR", undefined);
        }
        else
        {
            callback(undefined, {
                currentTemp: response.body.current.temperature,
                feelsLike: response.body.current.feelslike
            })
        }
    })
};


module.exports = forecast;