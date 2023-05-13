const express = require("express");
const request = require("request");
const geocode = require("./utils/Geocode");
const forecast = require("./utils/Forecast");

const app = express();

// const cityName = process.argv[2];
//
// if (!cityName) {
//   console.log("Please provide city name.");
// } else {
//   // geocode(cityName, (error, data)=>{
//   geocode(cityName, (error, { latitude, longitude, location }) => {
//     if (error) {
//       return console.log(error);
//     }

//     // forecast(data.latitude, data.longitude, (error, forecastdata)=>{
//     // Destructuring forecast data as we are getting latitude, longitude and location from forecastdata
//     forecast(latitude, longitude, (error, forecastdata) => {
//       if (error) {
//         return console.log(error);
//       }
//       // console.log(data.location);
//       console.log(location);
//       console.log(forecastdata);
//     });
//   });
// }

app.get("/", (req, res) => {
  if (!req.query.city) {
    console.log("Please provide City Name");
  }
  geocode(req.query.city, (error, { latitude, longitude, location }) => {
    if (error) {
      res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastdata) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastdata,
        location,
        city: req.query.city,
      });
    });
  });
});

app.listen(3000, () => {
  console.log("Server running on Port 3000 ");
});
