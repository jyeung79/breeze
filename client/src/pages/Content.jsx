import React, { useReducer, useState } from 'react';
import AlgoliaPlaces from 'algolia-places-react';
import { DateRangeInput, DateSingleInput, DatePicker } from '@datepicker-react/styled';

import Weather from '../components/Weather';
//import Skycons from '../utils/skycons-master/skycons';

import '../static/css/reset.css';
import '../static/css/styles.css';
import '../static/css/ap-dropdown.css';
import Layout from '../components/Layout';

const initialState = {
    startDate: null,
    endDate: null,
    focusedInput: null,
};

function reducer(state, action) {
    switch (action.type) {
        case 'focusChange':
            console.log({...state, focusedInput: action.payload});
            return {...state, focusedInput: action.payload};
        case 'dateChange':
            console.log(action.payload);
            return action.payload;
        default:
            throw new Error();
    }
};

const Content = () => {
    const [location, setLocation] = useState('Vancouver, British Columbia, Canada');
    const [latLng, setLatLng] = useState([49.2827, -123.1207]);
    const [state, dispatch] = useReducer(reducer, initialState);
    // The second param is an array of variables the component will check to make sure its changed
    // before re-rendering
    // Putting nothing also ensures it runs once

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
                        console.log("suggestion", suggestion);
                        setLocation(suggestion.value);
                        setLatLng([suggestion.latlng.lat, suggestion.latlng.lng]);
                    }}
                    onError={({ message }) =>
                        console.log(
                            'Fired when we could not make the request to Algolia Places servers for any reason but reaching your rate limit.'
                        )}
                />
                <div className="flex justify-between my-4">
                    <div className="my-auto">
                        <DateRangeInput
                            onDatesChange={data => dispatch({type: 'dateChange', payload: data})}
                            onFocusChange={focusedInput => dispatch({type: 'focusChange', payload: focusedInput})}
                            startDate={state.startDate}
                            endDate={state.endDate}
                            focusedInput={state.focusedInput}
                        />                        
                    </div>
                    <p className="my-auto text-2xl text-gray-700">
                        Selected: <strong className="text-black" id="address-value">{location}</strong>
                    </p>
                </div>
                <Weather location={location} lat={latLng[0]} lng={latLng[1]} />
            </>
        } />    
    );
}

export default Content;
