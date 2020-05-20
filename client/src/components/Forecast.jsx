import React, { useEffect } from 'react';
import moment from 'moment-timezone';

import SkyCons from '../utils/skycons-master/skycons';
import '../static/css/reset.css';
import '../static/css/styles.css';

const hourlyWeather = (props, index, timezone) => {
    return (
        <div className="flex items-center justify-between px-2 h-32 text-white">
              <div className="w-1/6 text-xl text-gray-200">{moment(props.time*1000).tz(timezone).format("ddd, hA")}</div>
              <div className="w-3/6 px-4 text-xl flex justify-center">
                <div className="h-full w-full p-2">
                    <canvas id={index} width="150" length="150"></canvas>
                </div>
              </div>
              <div className="w-2/6 px-2 text-lg flex items-center justify-between">
                <div className="text-lg">{props.summary}</div>
                <div className="text-blue-200 mx-3">Rain: {Math.round(props.precipProbability*100)}%</div>
              </div>
              <div className="w-1/6 text-lg text-right">
                  <div>High: {Math.round(props.temperature)} C°</div>
                  <div>Low: {Math.round(props.apparentTemperature)} C°</div>
              </div>
        </div>
    );
}


const Forecast = (props) => {
    console.log(props.timezone);
    let first = props.forecast.map((hour, index) => index !== 0 ? hourlyWeather(hour, index, props.timezone) : '');

    useEffect(() => {
        let skycons = new SkyCons({"monochrome": false});
        props.forecast.forEach((entry, index) => skycons.add(`${index}`, `${entry.icon}`));
        skycons.play();
    }, [first]);

    return (
        <div className="text-sm bg-gray-600 px-6 py-8 overflow-hidden rounded-lg">
            {first}
        </div>
        
    );
};

export default Forecast;