const axios = require('axios');
const helper = require('./helper');
const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv').config();

const app = express();
const api = process.env.DARK_SKY_API_KEY;
let port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
    res.render('index', {weatherObject: null, error: null, format: null, location:null});
})

app.post('/', async function (req, res) {
    let [lat, lng] = req.body.latlng.toString().split(',');
    let location = req.body.location.toString().split(',');
    let format = req.body.forecast === '' ? 'daily' : req.body.forecast;
    
    //console.log(req.body);
    
    try {
        let urlDark = `https://api.darksky.net/forecast/${api}/${lat},${lng}?exclude=minutely,alerts,flags&units=ca`;
        let weather = await axios.get(urlDark).then(response => {return response.data});
        //console.log(weather);
        let weatherObject = [];
        //console.log(format);

        if (format === "weekly") {
            weatherObject = helper.generateWeeklyForecast(weather);
        } else if (format == "daily") {
            weatherObject = helper.generateHourlyForecast(weather);
        } else {
            weatherObject = helper.generateCurrentForecast(weather);
        }

        if (weather == undefined){
            res.render('index', {weatherObject: null, error: 'Error. Type in City, Country format.', format: null, location:null});
        } else {
            res.render('index', {weatherObject: weatherObject, error: null, format: format, location:location});
        }
    } catch (err) {
        res.render('index', {weatherObject: null, error: err, format: null, location: null});
    }
})


app.listen(port, function () {
    console.log('Example app listening on port 3000!');
})