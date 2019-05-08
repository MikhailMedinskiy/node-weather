const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibWlrbG9zaCIsImEiOiJjanVta2diajMwZXJrNGRtdTl0ZTFmZXhhIn0.iPMPPAwzfGhUoPBvnTiJ3w`;

    request({url: url, json: true}, (error, resp) =>{
        if(error){
            callback('somthing goes wrong with internet connection', undefined)
        } else if(!resp.body.features.length){
            callback('no result. Tru another search', undefined)
        } else {
            const [lot, lat] = resp.body.features[0].center;
            callback(undefined, {
                lat,
                lot,
                loaction: resp.body.features[0].place_name
            })
        }
    })
};

module.exports = geocode;