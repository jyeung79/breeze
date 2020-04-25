import React from 'react';
import axios from 'axios';
import dotenv from 'dotenv';

import '../static/css/reset.css';
import '../static/css/styles.css';


const Weather = ({ lat, lng }) => {
    let darkAPI = `https://api.darksky.net/forecast/${process.env.REACT_APP_DARK_SKY_API}/${lat},${lng}?exclude=minutely,alerts,flags&units=ca`;
    
    const weatherData = async(url) => {
        let result = await axios.get(url).then(response => {return response.data});
        return result;
    }

    let data = weatherData(darkAPI);
    console.log(data);

    return (
        <div>
            <p>Lat:{lat} and Lng:{lng}</p>
        </div>
    );
};

export default Weather;