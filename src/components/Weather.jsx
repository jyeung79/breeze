import React from 'react';
import axios from 'axios';

import '../static/css/reset.css';
import '../static/css/styles.css';


const Weather = ({ lat, lng }) => {
    //let darkAPI = `https://api.darksky.net/forecast/${api}/${lat},${lng}?exclude=minutely,alerts,flags&units=ca`;
    //let weather = await axios.get(urlDark).then(response => {return response.data});

    return (
        <p>Lat:{lat} and Lng:{lng}</p>
    );
};

export default Weather;