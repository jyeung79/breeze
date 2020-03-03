const axios = require('axios');
const helper = require('./helper');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const api = ['AIzaSyCNgF420mDNKUhQleg2dmAbATUdXZGe7LU','57a5af899175dbb182ece9faeebfe2c0'];

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
    res.render('index', {weatherObject: null, error: null, format: null, location:null});
})

app.post('/', async function (req, res) {
    let [lat, lng] = req.body.latlng.toString().split(',');
    let location = req.body.location.toString().split(',');
    console.log(req.body);
    console.log(location);
    //console.log(location);

    try {
        let urlDark = `https://api.darksky.net/forecast/${api[1]}/${lat},${lng}?exclude=minutely,alerts,flags&units=ca`;
        let weather = await axios.get(urlDark).then(response => {return response.data});
        console.log(weather);
        
        let format = 'hourly';
        //let weatherObject = helper.generateCurrentForecast(weather);
        let weatherObject = helper.generateHourlyForecast(weather);
        //let weatherObject = helper.generateWeeklyForecast(weather);

        if (weather == undefined){
            res.render('index', {weatherObject: null, error: 'Error. Type in City, Country format.', format: null, location:null});
        } else {
            res.render('index', {weatherObject: weatherObject, error: null, format: null, location:location});
        }
    } catch (err) {
        res.render('index', {weatherObject: null, error: err, format: null, location: null});
    }
})


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
})