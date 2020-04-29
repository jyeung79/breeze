const axios = require('axios');
const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');

const app = express();
const helper = require('./helper');
const api = process.env.DARK_SKY_API_KEY;
let port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

require('./routes')(app);

app.get('/', function (req, res) {
    res.send('PORT 3000');
})

app.post('/', async function (req, res) {
    try {
        let urlDark = `https://api.darksky.net/forecast/${api}/${lat},${lng}?exclude=minutely,alerts,flags&units=ca`;
        let weather = await axios.get(urlDark).then(response => {return response.data});
        //console.log(weather);
        res.send()
    } catch (err) {
        res.render('index', {weatherObject: null, error: err, format: null, location: null});
    }
})


app.listen(port, (err) => {
    if (err) { console.log(err) };
    console.log('Listening on port ' + port);
})