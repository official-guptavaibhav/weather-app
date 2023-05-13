const request = require("request");

// Fetching Weather data from Weather API

// const url =
//   "http://api.weatherstack.com/current?access_key=813a4d56d00ca8309beda3e1bde24f2a&query=New%20York&units=m";
// // const url = 'https://api.openweathermap.org/data/2.5/forecast?q=Kanpur&appid=25de4572f2dcc1ffe4c1304d4f893f5b';
// request({ url: url, json: true }, (err, res) => {
//   //  const data =  JSON.parse(res.body);
//   //  console.log(`${data.current.weather_descriptions[0]}: Currently it is ${data.current.temperature} degrees out, there is ${data.current.precip}% chance of rain`);
//   if (err) {
//     console.log("Unable to Connect");
//   } else if (res.body.err) {
//     console.log("Unable to find Location");
//   } else {
//     console.log(
//       `${res.body.current.weather_descriptions[0]}: Currently it is ${res.body.current.temperature} degrees out, there is ${res.body.current.precip}% chance of rain`
//     );
//   }
// });

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=813a4d56d00ca8309beda3e1bde24f2a&query=" +
    latitude +
    "," +
    longitude +
    "units=m";

  //  Destructuring url & response object
  //  request({url: url, json: true}, (error, response)=>{
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to server.", undefined);
      // } else if (response.body.error) {
    } else if (body.error) {
      callback("Unable to find location.", undefined);
    } else {
      // callback(undefined, `${response.body.current.weather_descriptions[0]}: Currently it is ${response.body.current.temperature} degrees out, there is ${response.body.current.precip}% chance of rain`)
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}: Currently it is ${body.current.temperature} degrees out, there is ${body.current.precip}% chance of rain`
      );
    }
  });
};
module.exports = forecast;
