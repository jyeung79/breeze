import { combineReducers } from 'redux';

const initialState = {
    forecast: 'Hourly',
    location: 'Vancouver, British Columbia, Canada',
    lat: 49.2827,
    lng: -123.1207
}

const forecastReducer = (state=initialState.forecast, action) => {
    switch (action.type) {
        case 'CHANGE_DATE':
            return action.forecast;
        default:
            return state;
    }
};

const locationReducer = (state=initialState.location, action) => {
    switch(action.type) {
        case 'CHANGE_LOCATION':
            return action.location;
        default:
            return state;
    }
};

const latlngReducer = ( state={ lat: initialState.lat, lng: initialState.lng}, action) => {
    switch (action.type) {
        case 'CHANGE_LAT_LNG':
            return {lat: action.lat, lng: action.lng};
        default:
            return state;
    }
};

const allReducers = combineReducers({
    forecast: forecastReducer,
    location: locationReducer,
    latlng: latlngReducer
})

export default allReducers;