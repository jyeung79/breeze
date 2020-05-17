import React, { useEffect, useState } from 'react';
import axios from 'axios';

import '../static/css/reset.css';
import '../static/css/styles.css';

const Weather = ({ location, lat, lng }) => {
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

            const conditions = ['time', 'summary', 'icon', 'precipProbability', 'temperature', 'apparentTemperature'];
            
            const filtered = Object.keys(response)
                .filter(key => conditions.includes(key))
                .reduce((obj, entry) => {
                    obj[entry] = response[entry];
                    return obj;
                }, {});

            console.log("filtered :", filtered);
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
            <div>
                <div className="font-sans w-full max-w-4xl rounded-lg bg-gray-700 overflow-hidden shadow-lg text-white mt-4 mx-auto">
                    <div className="current-weather flex items-center justify-between px-6 py-4">
                        <div className="flex items-center">
                            <div>
                                <div className="text-6xl font-semibold">{weather.temperature}</div>
                                <div className="text-3xl font-semibold">Feels Like: {weather.apparentTemperature} </div>
                            </div>
                        </div>
                        <div className="mx-5 text-xl">
                            <div className="font-semibold">{weather.summary}</div>
                            <div>{location}</div>
                        </div>
                        <div>
                            <canvas id="currenticon" width="72" height="72"></canvas>
                            {/*<script> skycons.add("currenticon", `${weather.icon}`);</script>*/}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Weather;