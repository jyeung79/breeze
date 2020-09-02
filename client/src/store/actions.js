const changeForecast = (forecast) => {
    return {
        type: 'CHANGE_FORECAST',
        forecast: forecast
    }
};

const changeLocation = (location) => {
    return {
        type: 'CHANGE_LOCATION',
        location: location
    }
};

const changeLatLng = (lat, lng) => {
    return {
        type: 'CHANGE_LAT_LNG',
        lat: lat,
        lng: lng
    }
};

// store.dispatch(changeForecast('weekly'));
// store.dispatch(changeLocation('Calgary Alberta'));




export { changeForecast, changeLocation, changeLatLng };