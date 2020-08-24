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


const Forecast = (props) => {
    console.log(props.timezone);
    let hourly = props.forecast.map((hour, index) => index !== 0 ? hourlyWeather(hour, index, props.timezone) : '');
    let daily = "";

    useEffect(() => {
        let skycons = new SkyCons({"monochrome": false});
        props.forecast.forEach((entry, index) => skycons.add(`${index}`, `${entry.icon}`));
        skycons.play();
    }, [hourly, daily]);

    return (
        <div className="max-w-6xl text-sm bg-gray-600 px-6 py-8 overflow-hidden rounded-lg mx-auto">
            {hourly}
            {daily}
        </div>
        
    );
};

export default Forecast;