import React, { useState } from 'react';
import AlgoliaPlaces from 'algolia-places-react';
import { useSelector, useDispatch } from 'react-redux';
import { changeForecast, changeLocation, changeLatLng } from '../store/actions';

import Button from '../components/Button';
import Weather from '../components/Weather';
//import Skycons from '../utils/skycons-master/skycons';

import '../static/css/reset.css';
import '../static/css/styles.css';
import '../static/css/ap-dropdown.css';
import Layout from '../components/Layout';

const Content = () => {
    //const [location, setLocation] = useState('Vancouver, British Columbia, Canada');
    //const [latLng, setLatLng] = useState([49.2827, -123.1207]);
    const forecast = useSelector(state => state.forecast);
    const latLng = useSelector(state => state.latlng);
    const location = useSelector(state => state.location);
    const dispatch = useDispatch();

    return (
        <Layout children ={
            <>
                <AlgoliaPlaces
                    placeholder="Write an address here"
                    options={{
                        appId: 'plVVQ87U2ZPF',
                        apiKey: 'c35ecc9ab5dac235dd492ef0710c5537',
                        language: 'en',
                        type: 'city'
                        // Other options from https://community.algolia.com/places/documentation.html#options
                    }}
                    onChange={({ suggestion}) => {
                        //setLocation(suggestion.value);
                        console.log("suggestion", suggestion);
                        dispatch(changeLocation(suggestion.value));
                        dispatch(changeLatLng(suggestion.latlng.lat, suggestion.latlng.lng));
                    }}
                    onError={({ message }) =>
                        console.log(
                            'Fired when we could not make the request to Algolia Places servers for any reason but reaching your rate limit.'
                            + message
                        )}
                />
                <div className="flex justify-between my-4">
                    <p className="my-auto text-2xl text-gray-700">
                        Selected: <strong className="text-black" id="address-value">{location}</strong>
                    </p>
                    <div className="my-auto flex justify-between">
                        <p className="my-auto text-2xl text-gray-700">Forecast</p>
                        <Button type={'Hourly'} />
                        <Button type={'Daily'} />
                    </div>
                </div>
                <Weather />
            </>
        } />    
    );
}

export default Content;
