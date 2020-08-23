const changeDate = (startDate, endDate) => {
    return {
        type: 'CHANGE_DATE',
        dates: {
            startDate: startDate,
            endDate: endDate
        }
    }
};

const changeLocation = (location) => {
    return {
        type: 'CHANGE_LOCATION',
        location: location
    }
};

export { changeDate, changeLocation };