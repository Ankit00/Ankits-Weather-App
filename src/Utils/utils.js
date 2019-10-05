const request = require('request');

const geocode = (address,callback) => {
    
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiYmF0bWFuMDA3IiwiYSI6ImNrMHpxMDV0ODBncW0zZHBjOGljcnJyd28ifQ.ssc_-IRSQ1XgDLJWUSmJwg";
    request({url, json : true},(error,{body}) => {
        if(error){
            callback('Unable to connect to geocoding service!',undefined)
        }
        else if(body.features.length === 0){
            callback('Address not found!Please try again!',undefined);
        }
        else if(body.error){
            callback('Entered Address is invalid!Please try again!',undefined);
        }
        else if(body.message){
            callback('Secure Token Key is either wrong or not present',undefined);
        }
        else{
            callback(undefined,{
                place : body.features[0].place_name,
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0]
            });
        }
    })
};

const weatherInfo = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/c456ff0dc3df9b8e4d037d67a714db6f/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'?units=si';
    request({url, json : true },(error,{body}) => {
        if(error){
            callback('Unable to access weather service!',undefined);
        }
        else if(body.error){
            callback('Entered co-ordinates are incorrect.Please try again!',undefined);
        }
        else{
            callback(undefined,{
                summary : body.daily.data[0].summary,
                temperature : body.currently.temperature,
                rainProbability : body.currently.precipProbability
            })
        }
    })
}

module.exports = {
    geocode : geocode,
    weatherInfo : weatherInfo
}