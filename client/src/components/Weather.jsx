import React, { useEffect, useState } from 'react';
import axios from 'axios';

import '../static/css/reset.css';
import '../static/css/styles.css';

const Weather = ({ lat, lng }) => {
    const [error, setErrors] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [weather, setWeather] = useState([]);
    
    useEffect(() => {
        getWeather(lat, lng);
    }, [lat, lng]);

    async function getWeather(lat, lng) {
        console.log(lat, lng);
        if (lat !== undefined && lng !== undefined) {
            let url = `http://localhost:5000/search?lat=${lat}&lng=${lng}`;
            const response = await axios.get(url)
                .then(res => res.data)
                .then(res => res.currently)
                .catch(err => setErrors(err));
            console.log(response);

            let data = Object.entries(response);
            console.log(data);
        }
    };

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