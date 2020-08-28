const request = require("request");


const geocode = (address, callback) => {
    const MBURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibWF0ZWVuNDYyIiwiYSI6ImNrZTgzdm42NzB2bzAydHRmdTFoMnhxamYifQ.FZPBY2eTTgnCC5MKVu4Ndw";

    request({
            url: MBURL,
            json: true
        },(error, response) => {
            if (error)
            {
                callback("Unable to connect to the network", undefined);
            }
            else if(response.body.features.length==0)
            {
                callback("Unable to find the location. Please try again!", undefined);
            }
            else
            {
                callback(undefined, {
                    longitude: response.body.features[0].center[0],
                    latitude: response.body.features[0].center[1],
                    location: response.body.features[0].place_name
                });
            }
        });
};


module.exports = geocode;
