import React, { useState} from 'react';
import '../static/css/styles.css';
import { changeForecast } from '../store/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';


const Button = (props) => {
    const forecast = useSelector(state => state.forecast);
    const dispatch = useDispatch();

    const [toggle, setToggle] = useState(forecast === props.type ? true: false);
    const color = props.type === 'Hourly' ? 'blue' : 'green';

    const handleClick = () => {
        if (forecast !== props.type) dispatch(changeForecast(props.type));
    };

    useEffect(() => {
        if (forecast !== props.type) setToggle(false);
        else setToggle(true);
    }); 

    return (
        <button
            className={`mx-2 text-xl hover:bg-${color}-500 font-semibold hover:text-white py-2 px-4 border border-${color}-500 hover:border-transparent rounded ` +  `${toggle ? `bg-${color}-500 text-white opacity-50 cursor-not-allowed` : `bg-transparent text-${color}-700`}`}
            onClick={handleClick}
        >
            {props.type}
        </button>
    )
};

export default Button;