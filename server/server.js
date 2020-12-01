const axios = require('axios');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

let api = process.env.DARK_SKY_API;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.get('/', (res) => {
    res.send(`This server pulls weather data from <a href="https://darksky.net/dev">DarkSkyApi</a>.
    Use the api in this format: http://breeze-express.herokuapp.com/search?lat=LOCATION_LAT&lng=LOCATION_LNG 
    Replace LOCATION_LAT & LOCATION_LNG with the latitude and longitude floating point number of your choice.
    `);
});

app.get('/search', async function(req, res) {
    console.log(req.query);
    if (req.query.lat !== undefined && req.query.lng !== undefined) {
        let lat = req.query.lat;
        let lng = req.query.lng;
        console.log(lat, lng);
        let url = `https://api.darksky.net/forecast/${api}/${lat},${lng}?exclude=minutely,alerts,flags&units=ca`;
        
        try {
            const weather = await axios.get(url).then(res => {return res.data});
            console.log(weather);
            res.send(weather);
        } catch (err) {
            res.send(err);
        }
    } else {
        res.send('Does not exist');
    }
});