const request = require('request');

const forecast = (lat, lot, callback) => {
    const url = `https://api.darksky.net/forecast/753bf63293d54bfe81ef7a456725f245/${lat},${lot}?units=si`;

    request({url: url, json: true}, (error, resp) => {
        if(error){
            callback('unable to connect to weather service!', undefined)
        }  else if(resp.body.error){
            callback('unable to find location!', undefined)
        } else {
            const data = {
                temp: resp.body.currently.temperature,
                rainPersent: resp.body.currently.precipProbability,
                dailyToday: resp.body.daily.data[0].summary,
            };

            const info = `${data.dailyToday} It's currentlu ${data.temp} degrees out. There is ${data.rainPersent}% change of rain`
            callback(undefined, info);
        }
    })
};

module.exports = forecast;