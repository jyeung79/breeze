const axios = require('axios');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const api = ['57a5af899175dbb182ece9faeebfe2c0', 'AIzaSyCNgF420mDNKUhQleg2dmAbATUdXZGe7LU'];
let latitude = 0;
let longitude = 0;
let response = [];

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
    res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
    let location = req.body.location;
    let [city, country] = location.toString().split(',');
    console.log(city + country);

    // use backticks ` ` when using template literals
    // ? appends query parameters, & added between multiple parameters
    let urls = [
        `https://api.darksky.net/forecast/${api[0]}/${latitude},${longitude}?exclude=minutely,hourly,daily,alerts,flags&units=ca`,
        `https://maps.googleapis.com/maps/api/geocode/json?address=${city},+${country}&key=${api[1]}`,      
    ];
    
    axios.get(urls[0]).then(response => {
        console.log(response.data)
    }).catch(error => {
        console.err(error)
    });
    /*request(url, function (err, response, body) {
        if (err) {res.render('index', {weather: null, error: 'Error, please try again'});}
        else {
            let weather = JSON.parse(body);
            if (weather.currently == undefined){
                res.render('index', {weather: null, error: 'Error, please try again'});
            } else {
                let weatherText = `It's ${weather.currently.temperature} degrees outside so its ${weather.currently.summary}.`
                res.render('index', {weather: weatherText, error: null});
            }
        }
    })
    */
})

async function getData(url) {
    try {
        response[0] = await axios.get(url[0]
            .then(response => (console.log(response))));
        //response[1] = await axios.get(url[1]
        //    .then(response => (console.log(response))));
        res.render('index', {weather: null, error: null});
    } catch (err) {
        console.log(err);
        res.render('index', {weather: null, error: 'Error, Please try again'});
    }
}

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
})

function coordinates(city) {
}