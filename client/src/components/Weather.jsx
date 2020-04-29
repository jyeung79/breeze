import React, { useEffect, useState } from 'react';
import axios from 'axios';

import '../static/css/reset.css';
import '../static/css/styles.css';


const Weather = ({ lat, lng }) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [weather, setWeather] = useState([]);
    
    useEffect(() => {
        fetch(`https://api.darksky.net/forecast/${process.env.REACT_APP_DARK_SKY_API}/${lat},${lng}?exclude=minutely,alerts,flags&units=ca`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setWeather(result.weather);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [lat, lng])

    
    //let darkAPI = `https://api.darksky.net/forecast/${process.env.REACT_APP_DARK_SKY_API}/${lat},${lng}?exclude=minutely,alerts,flags&units=ca`;
    
    /*const weatherData = async(url) => {
        let result = await axios.get(url).then(response => {return response.data});
        return result;
    }
    
    let data = weatherData(darkAPI);
    console.log(data); */
    console.log(weather);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>
    } else {
        return (
            <div>
                <p>Lat:{lat} and Lng:{lng}</p>
                <p>{weather}</p>
            </div>
        );
    }
};

export default Weather;