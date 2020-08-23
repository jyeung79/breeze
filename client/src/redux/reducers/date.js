import moment from 'moment';

const dateReducer = (state= { startDate: '' , endDate: '' }, action) => {
    switch (action.type) {
        case '':
            return '';
        default:
            return state;
    }
};

export default dateReducer;