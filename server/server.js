const axios = require('axios');
const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');

const app = express();
const helper = require('./helper');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

require('./routes')(app);

app.get('/', function (req, res) {
    res.send('PORT 3000');
})

app.listen(port, (err) => {
    if (err) { console.log(err) };
    console.log('Listening on port ' + port);
})