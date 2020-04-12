import React, { useEffect } from 'react';
import AlgoliaPlaces from 'algolia-places-react';

import '../static/css/reset.css';
import '../static/css/styles.css';
import '../static/css/ap-dropdown.css';
import Skycons from '../utils/skycons-master/skycons';

const Content = () => {
    useEffect(() => {
        let skycons = new Skycons({"monochrome": false});
        skycons.add("navicon", "showers-day");
        skycons.play();
    }, [])
    // The second param is an array of variables the component will check to make sure its changed
    // before re-rendering
    // Putting nothing also ensures it runs once

    return (
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
                onChange={({ query, rawAnswer, suggestion, suggestionIndex }) => {
                    console.log('Fired when suggestion selected in the dropdown or hint was validated.');
                }}
                onError={({ message }) =>
                    console.log(
                        'Fired when we could not make the request to Algolia Places servers for any reason but reaching your rate limit.'
                    )}
            />
            <div class="flex justify-between">
                <p class="mt-4 text-xl">
                    Selected: <strong id="address-value">Location</strong>
                </p>
                <div class="inline-flex mt-2">
                    <button
                        type="button"
                        id="hours"
                        class="bg-green-300 hover:bg-green-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                    >
                        48-hrs
                    </button>
                    <button
                        type="button"
                        id="week"
                        class="bg-blue-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                    >
                        7-days
                    </button>
                </div>
            </div>
        </>
    );
}

export default Content;
