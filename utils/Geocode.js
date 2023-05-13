const request = require("request");

// // Fetching GeoLocation from Geocoding API
// // Converting a City Name into it's related Longitude & Latitude using Geolocation API
// const geocoding =
//   "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoidmFpYmhhdmV3dyIsImEiOiJjbGd2d3d4bmkxZW5qM2dxaWdtM25nZnZqIn0.7zV9FWbrsMymOn6uNKLTWw&limit=1";
// request({ url: geocoding, json: true }, (err, res) => {
//   if (err) {
//     console.log("Unable to connect to location services.");
//   } else if (res.body.features === 0) {
//     console.log("Unable to find location");
//   } else {
//     const lon =  res.body.features[0].center[0];
//     const lat = res.body.features[0].center[1];
//     console.log(`Longitude is ${lon} Latitude is ${lat}`);
//   }
// });

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoidmFpYmhhdmV3dyIsImEiOiJjbGd2d3d4bmkxZW5qM2dxaWdtM25nZnZqIn0.7zV9FWbrsMymOn6uNKLTWw&limit=1";

  // request({ url : url, json: true }, (error, response)=>{
  //  destructuring url & response object
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to server.", undefined);
      // } else if(response.body.features.length === 0 ){
    } else if (body.features.length === 0) {
      callback("Unable to find location.", undefined);
    } else {
      callback(undefined, {
        // latitude: response.body.features[0].center[1],
        // longitude: response.body.features[0].center[0],
        // location: response.body.features[0].place_name
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};
module.exports = geocode;
