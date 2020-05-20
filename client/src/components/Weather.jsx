import React, { useEffect, useState } from 'react';
import axios from 'axios';

import SkyCons from '../utils/skycons-master/skycons';
import '../static/css/reset.css';
import '../static/css/styles.css';

const Weather = ({ location, lat, lng }) => {
    const [error, setErrors] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [weather, setWeather] = useState([]);
    
    useEffect(() => {
        getWeather(lat, lng);
        let skycons = new SkyCons({"monochrome": false});
        skycons.add("currenticon", `${weather.icon !== undefined ? weather.icon : 'rain'}`);
        console.log(`icon is ${weather.icon !== undefined ? weather.icon : 'rain'}`);
        skycons.play();
    }, [isLoaded, lat, lng]);

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

    /*
    useEffect(() => {
        let skycons = new SkyCons({"monochrome": false});
        skycons.add("current", "rain");
        console.log(`${weather.icon}`);
        skycons.play();
    }, [weather])*/

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>
    } else {
        return (
            <div>
                <div className="font-sans w-full max-w-6xl rounded-lg bg-gray-700 overflow-hidden shadow-lg text-white mt-4 mx-auto">
                    <div className="current-weather flex items-center justify-between px-6 py-4">
                        <div className="flex items-center">
                            <div>
                                <div className="text-6xl font-semibold">{weather.temperature} C°</div>
                                <div className="text-3xl font-semibold">Feels Like: {weather.apparentTemperature} C°</div>
                            </div>
                        </div>
                        <div className="mx-5 text-xl">
                            <div className="font-semibold">{weather.summary}</div>
                            <div>{location}</div>
                        </div>
                        <div>
                            <canvas id="currenticon" width="72" height="72"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Weather;