import React, { useEffect } from 'react';
import moment from 'moment-timezone';

import SkyCons from '../utils/skycons-master/skycons';
import '../static/css/reset.css';
import '../static/css/styles.css';
import '../static/css/weatherIcon.css';

const hourlyWeather = (props, index, timezone) => {
    return (
        <div key={`item-${index}`}>
            <div className="flex items-center justify-between px-2 h-32 text-white">
                <div className="w-1/6 text-xl text-gray-200">{moment(props.time*1000).tz(timezone).format("ddd, hA")}</div>
                <div className="w-4/6 px-4 text-xl flex items-center justify-between">
                    <div className="text-lg mx-24">{props.summary}</div>
                    <div className="h-full p-2 mr-24">
                        <canvas className="weatherIcon" id={index} width="150" length="150"></canvas>
                    </div>
                </div>
                <div className="w-1/6 px-2 text-lg">
                    <div className="text-blue-200 mx-3">Rain: {Math.round(props.precipProbability*100)}%</div>
                </div>
                <div className="w-1/6 text-lg text-right">
                    <div>High: {Math.round(props.temperature)} C°</div>
                    <div>Low: {Math.round(props.apparentTemperature)} C°</div>
                </div>
            </div>
        </div>
    );
};

const dailyWeather = (props, index, timezone) => {
    return (
        <div key={`item-${index}`}>
            <div className="flex items-center justify-between px-2 h-32 text-white">
                <div className="w-1/6 text-xl text-gray-200">{moment(props.time*1000).tz(timezone).format("ddd, MMM Do")}</div>
                <div className="w-4/6 px-4 text-xl flex items-center justify-between">
                    <div className="text-lg mx-24">{props.summary}</div>
                    <div className="h-full p-2 mr-24">
                        <canvas className="weatherIcon" id={index} width="150" length="150"></canvas>
                    </div>
                </div>
                <div className="w-1/6 px-2 text-lg">
                    <div className="text-blue-200 mx-3">Rain: {Math.round(props.precipProbability*100)}%</div>
                </div>
                <div className="w-1/6 text-lg text-right">
                    <div>Max: {Math.round(props.temperatureHigh)} C°</div>
                    <div>Min: {Math.round(props.temperatureMin)} C°</div>
                </div>
            </div>
        </div>
    );
};

const CurrentWeather = (props) => (
    <>
        <div className={props.forecast === 'Hourly' ? `text-6xl font-semibold` : `text-4xl font-semibold`}>{
            props.forecast === 'Hourly' ? Math.round(props.weather[0].temperature)
            : `Max Temp: ` + Math.round(props.weather[0].temperatureHigh)
        } C°</div>
        <div className={props.forecast === 'Hourly' ? 'text-3xl font-semibold' : 'text-4xl font-semibold'}>{
            props.forecast === 'Hourly' ? `Feels Like: `+ Math.round(props.weather[0].apparentTemperature)
            : `Min Temp: ` + Math.round(props.weather[0].temperatureMin)
        } C°</div>
    </>
);

const Forecast = (props) => {
    console.log(props.timezone);
    let weatherForecast = props.weather.slice(1).map((time, index) => props.forecast === 'Hourly' ? hourlyWeather(time, index, props.timezone) : dailyWeather(time, index, props.timezone));
    
    useEffect(() => {
        let skycons = new SkyCons({"monochrome": false});
        skycons.add('currenticon', props.weather[0].icon);
        props.weather.forEach((entry, index) => skycons.add(`${index}`, `${entry.icon}`));
        skycons.play();
    }, [weatherForecast]);

    return (
        <>
            <div className="font-sans w-full max-w-6xl rounded-lg bg-gray-700 overflow-hidden shadow-lg text-white mt-4 mx-auto">
            <div className="current-weather flex items-center justify-between px-6 py-4">
                <div className="flex items-center">
                    <div>
                        <CurrentWeather weather={props.weather} forecast={props.forecast}/>
                    </div>
                </div>
                <div className="mx-5 text-xl">
                    <div className="font-semibold">{props.weather[0].summary}</div>
                    <div>{props.location.split(',')[0]}</div>
                </div>
                <div>
                    <canvas id="currenticon" width="100" height="100"></canvas>
                </div>
            </div>
            </div>
            <div className="max-w-6xl text-sm bg-gray-600 px-6 py-8 overflow-hidden rounded-lg mx-auto">
                {weatherForecast}
            </div>
        </>
    );
};

export default Forecast;