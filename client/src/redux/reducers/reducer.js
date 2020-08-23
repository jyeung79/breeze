import dateReducer from './date';
import locationReducer from './location';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    dateReducer,
    locationReducer
})

export default allReducers;