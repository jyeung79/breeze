const axios = require('axios');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const api = ['AIzaSyCNgF420mDNKUhQleg2dmAbATUdXZGe7LU','57a5af899175dbb182ece9faeebfe2c0'];

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
    res.render('index', {weather: null, error: null});
})

app.post('/', async function (req, res) {
    let location = req.body.location;
    let [city, country] = location.toString().split(',');
    console.log(city + country);
    let urlMap = `https://maps.googleapis.com/maps/api/geocode/json?address=${city},+${country}&key=${api[0]}`;

    // use backticks ` ` when using template literals
    // ? appends query parameters, & added between multiple parameters
    try {
        let coordinates = await axios.get(urlMap).then(response => {return response.data.results[0].geometry.location});
        console.log(coordinates);
        let urlDark = `https://api.darksky.net/forecast/${api[1]}/${coordinates.lat},${coordinates.lng}?exclude=minutely,hourly,daily,alerts,flags&units=ca`;
        let weather = await axios.get(urlDark).then(response => {return response.data.currently});
        console.log(weather);
        //let weather = JSON.parse(currently);
        //console.log(weather);
        
        if (weather == undefined){
            res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
            let weatherText = `It's ${weather.temperature} degrees outside so its ${weather.summary}.`
            res.render('index', {weather: weatherText, error: null});
        }
    } catch (err) {
        console.log(err);
        res.render('index', {weather: null, error: 'Error, please try again'});
    }
})


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
})