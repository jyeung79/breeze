const axios = require('axios');
const helper = require('./helper');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const api = ['AIzaSyCNgF420mDNKUhQleg2dmAbATUdXZGe7LU','57a5af899175dbb182ece9faeebfe2c0'];

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
    res.render('index', {weather: null, error: null});
})

app.post('/', async function (req, res) {
    global.document = new JSDOM('./public/index.ejs').window.document;

    let [lat, lng] = [null, null];
    let location = req.body.location;
    let [city, country] = location.toString().split(',');
    console.log(city + country);
    let urlMap = `https://maps.googleapis.com/maps/api/geocode/json?address=${city},+${country}&key=${api[0]}`;

    try {
        // Assume one city to be chosen for now
        let responseGeo  = await axios.get(urlMap).then(response => {return response.data.results});
        [lat, lng] = helper.getCoordinates(responseGeo);

        let urlDark = `https://api.darksky.net/forecast/${api[1]}/${lat},${lng}?exclude=minutely,alerts,flags&units=ca`;
        let weather = await axios.get(urlDark).then(response => {return response.data});
        console.log(weather.daily);
        //let weatherObject = helper.generateCurrentForecast(weather);
        //let weatherObject = helper.generateHourlyForecast(weather);
        let weatherObject = helper.generateWeeklyForecast(weather);

        if (weather == undefined){
            res.render('index', {weatherObject: null, error: 'Error. Type in City, Country format.'});
        } else {
            res.render('index', {weatherObject: weatherObject, error: null});
        }
    } catch (err) {
        res.render('index', {weatherObject: null, error: err});
    }
})


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
})