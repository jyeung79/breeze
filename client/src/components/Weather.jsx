import React, { useEffect, useState } from 'react';
import axios from 'axios';

import SkyCons from '../utils/skycons-master/skycons';
import Forecast from './Forecast';
import '../static/css/reset.css';
import '../static/css/styles.css';

const Weather = ({ location, lat, lng }) => {
    const [error, setErrors] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [weather, setWeather] = useState([]);
    const [timezone, setTimeZone] = useState('America/Vancouver');
    
    const conditions = ['time', 'summary', 'icon', 'precipProbability', 'temperature', 'apparentTemperature'];
    
    useEffect(() => {
        getWeather(lat, lng);
    }, [isLoaded, lat, lng]);
    
    function filter(response, index) {
        return Object.keys(response)
        .filter(key => conditions.includes(key))
        .reduce((obj, entry) => {
            obj[entry] = response[entry];
            return obj;
    }, {})};

    async function getWeather(lat, lng) {
        console.log(lat, lng);
        if (lat !== undefined && lng !== undefined) {
            let url = `http://localhost:5000/search?lat=${lat}&lng=${lng}`;
            let forecastType = 'hourly';
            
            const response = await axios.get(url)
            .then(res => res.data)
            .catch(err => setErrors(err));
            console.log(response);
            
            const weatherData = forecastType === 'hourly' ? response.hourly : response.daily;
            let filtered =[];
            filtered = weatherData.data.map((entry, index) => filter(entry, index));
            console.log(filtered);

            //console.log("filter :", filtered);
            
            let skycons = new SkyCons({"monochrome": false});
            skycons.add("currenticon", `${filtered[0].icon}`);
            skycons.play();

            setTimeZone(response.timezone);
            setWeather(filtered);
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
                <div className="font-sans w-full max-w-6xl rounded-lg bg-gray-700 overflow-hidden shadow-lg text-white mt-4 mx-auto">
                    <div className="current-weather flex items-center justify-between px-6 py-4">
                        <div className="flex items-center">
                            <div>
                                <div className="text-6xl font-semibold">{Math.round(weather[0].temperature)} C°</div>
                                <div className="text-3xl font-semibold">Feels Like: {Math.round(weather[0].apparentTemperature)} C°</div>
                            </div>
                        </div>
                        <div className="mx-5 text-xl">
                            <div className="font-semibold">{weather[0].summary}</div>
                            <div>{location.split(',')[0]}</div>
                        </div>
                        <div>
                            <canvas id="currenticon" width="100" height="100"></canvas>
                        </div>
                    </div>
                </div>
                <Forecast forecast={weather} timezone={timezone} />
            </div>
        );
    }
};

export default Weather;