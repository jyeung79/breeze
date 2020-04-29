const dotenv = require('dotenv').config();
const axios = require('axios');
const fetch = require('node-fetch');

module.exports = (apps) => {
    
    let lat, lng;

    app.post('/search-coords', (req, res) => {

        lat = req.body.lat;
        lng = req.body.lng;
        res.redirect('/weather');
    })

    app.get('/search-location-weather', (req, res) => {
        try {
            const weatherUrl = `https://api.darksky.net/forecast/${api}/${lat},${lng}?exclude=minutely,alerts,flags&units=ca`;

            let weatherData = await axios.get(weatherUrl).then(response => {return response.data});
            res.send(weatherData);
            console.log(weatherData);
        } catch (err) {
            res.redirect('/error');
        }
    })
}