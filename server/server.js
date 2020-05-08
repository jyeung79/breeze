const axios = require('axios');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
//const helper = require('./helper');
const port = process.env.PORT || 5000;
//const router = express.Router();
const logger = require('./middleware/logger');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use(cors());
app.use('/api/members', require('./routes/api/Members'));

app.use(logger);

app.listen(port, (err) => {
    if (err) { console.log(err) };
    console.log('Listening on port ' + port);
});