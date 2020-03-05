// Functions that will be called in the main file
module.exports = {
    // Get the coordinates from the JSON object from DarkSky
    getCoordinates: function (object) {
        if (Object.keys(object).length > 1) {
            throw "Please specify the city and the country";
        } else {
            let location = [object[0].geometry.location.lat, object[0].geometry.location.lng];
            return location;
        }
    },
    // Generate current weather conditions
    generateCurrentForecast: function (object) {
        if (object === undefined) {
            throw "Try again. Type in the city, country";
        } else {
            let currentWeather = object.currently;
            let weatherData = [unwrap(currentWeather)];

            weatherData[0].time = new Date(weatherData[0].time*1000).toGMTString();
            weatherData[0].precipProbability = Math.round(weatherData[0].precipProbability*100) + '%';
            weatherData[0].temperature = weatherData[0].temperature + ' C';
            //console.log(weatherData);
            return weatherData;
        }
    },
    // Generate hourly forecast for today
    generateHourlyForecast: function (object) {
        if (object === undefined) {
            throw "Try again. Type in the city, country";
        } else {
            let hourlyWeather = object.hourly.data;
            let timezone = object.timezone;
            let weatherData = [];
            hourlyWeather.forEach(object => {
                object.temperature = Math.round(object.temperature) + ' C' ;
                object.apparentTemperature = Math.round(object.apparentTemperature) + ' C';
                object.time = moment(object.time*1000).tz(timezone).format("ddd, hA");
                object.precipProbability = Math.round(object.precipProbability*100) + '%';
                weatherData.push(unwrap(object));
            });
            //console.log(weatherData);
            return weatherData;
        }
    },
    // Generate HTML for weekly forecast
    generateWeeklyForecast: function (object) {
        if (object === undefined) {
            throw "Try again. Type in the city, country";
        } else {
            let weeklyWeather = object.daily.data;
            let timezone = object.timezone;
            let weatherData = [];
            weeklyWeather.forEach(object => {
                object.temperatureMin = Math.round(object.temperatureMin) + ' C';
                object.temperatureMax = Math.round(object.temperatureMax) + ' C';
                object.time = moment(object.time*1000).tz(timezone).format("ddd, MMM D");
                object.precipProbability = Math.round(object.precipProbability*100) + '%';
                weatherData.push(unwrapWeekly(object));
            });
            //console.log(weatherData);
            return weatherData;
        }
    },
    // Generate HTML for estimated travel dates
    generateTravelForecast: function (object) {
        if (object === undefined) {
            throw "Try again. Type in the city, country";
        } else {
            let currentWeather = object.currently;
        }
    },
}
//Private variables and functions not accessible
let moment = require('moment-timezone');

// function to unwrap desired key value pairs
let unwrap = (
    {temperature, apparentTemperature, time, summary, precipProbability, icon}) => (
    {temperature, apparentTemperature, time, summary, precipProbability, icon}
);

let unwrapWeekly = (
    {time, icon, summary, precipProbability, temperatureMax, temperatureMin}) => (
    {time, icon, summary, precipProbability, temperatureMax, temperatureMin}
);
