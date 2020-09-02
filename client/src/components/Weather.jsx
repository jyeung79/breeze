import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { changeForecast, changeLocation, changeLatLng } from '../store/actions';

import Forecast from './Forecast';
import '../static/css/reset.css';
import '../static/css/styles.css';

const Weather = () => {
    const [error, setErrors] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [weather, setWeather] = useState([]);
    const [forecastData, setForecastData] = useState('');
    const [timezone, setTimeZone] = useState('America/Vancouver');
    
    // Forecast type
    const forecast = useSelector(state => state.forecast);
    const location = useSelector(state => state.location);
    const latlng = useSelector(state => state.latlng);
    
    const conditions = ['time', 'summary', 'icon', 'precipProbability'] + (forecast === 'Hourly' ? ['temperature', 'apparentTemperature'] : ['temperatureHigh', 'temperatureMin']);
    

    useEffect(() => {
        getWeather(latlng.lat, latlng.lng);
    }, [latlng, forecast]);
    
    function filter(response, index) {
        return Object.keys(response)
        .filter(key => conditions.includes(key))
        .reduce((obj, entry) => {
            obj[entry] = response[entry];
            return obj;
    }, {})};

    async function getWeather(lat, lng) {
        //console.log(lat, lng);
        if (lat !== undefined && lng !== undefined) {
            let url = `http://localhost:5000/search?lat=${lat}&lng=${lng}`;

            const response = await axios.get(url)
            .then(res => res.data)
            .catch(err => setErrors(err));
            console.log(response);
            
            let weatherData = forecast === 'Hourly' ? response.hourly : response.daily;
            let filtered =[];
            filtered = weatherData.data.map((entry, index) => filter(entry, index));
            if (filtered.length > 9) filtered = filtered.slice(0, 23);
            console.log(filtered);

            setTimeZone(response.timezone);
            setWeather(filtered);
            setForecastData(forecast);
            setIsLoaded(true);
        }
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>
    } else {
        return (
            <div id="currentWeather">
                <Forecast weather={weather} timezone={timezone} forecast={forecastData} location={location}/>
            </div>
        );
    }
};

export default Weather;