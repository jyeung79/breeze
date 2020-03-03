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
            let weatherData = [];
            hourlyWeather.forEach(object => {
                object.temperature = Math.round(object.temperature);
                object.apparentTemperature = Math.round(object.apparentTemperature);
                object.time = new Date(object.time*1000).toLocaleTimeString([],{weekday:'short', hour:'2-digit', minute:'2-digit'});
                object.precipProbability = Math.round(object.precipProbability*100) + '%';
                object.temperature = object.temperature + ' C';
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
            let weatherData = [];
            weeklyWeather.forEach(object => {
                object.time = new Date(object.time*1000).toDateString();
                object.precipProbability = Math.round(object.precipProbability*100) + '%';
                object.temperatureMin = object.temperatureMin + ' C';
                object.temperatureMax = object.temperatureMax + ' C';
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
    // Generate 

}
//Private variables and functions not accessible
// function to unwrap desired key value pairs
let unwrap = (
    {temperature, apparentTemperature, time, summary, precipProbability, icon}) => (
    {temperature, apparentTemperature, time, summary, precipProbability, icon}
);

let unwrapWeekly = (
    {time, icon, summary, precipProbability, temperatureMax, temperatureMin}) => (
    {time, icon, summary, precipProbability, temperatureMax, temperatureMin}
);
