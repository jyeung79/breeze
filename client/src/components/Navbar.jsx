import React, { useEffect } from 'react';
import SkyCons from '../utils/skycons-master/skycons';
import '../static/css/reset.css';
import '../static/css/styles.css';
import { Link } from "react-router-dom";

const ListLink = props => (
	<li className="block mt-4 md:inline-block md:mt-0 text-gray-200 hover:text-black mr-4">
	  <Link to={props.to}>{props.children}</Link>
	</li>
)

const Navbar = () => {
    useEffect(() => {
        let skycons = new SkyCons({"monochrome": false});
        skycons.add("navicon", "showers-day");
        skycons.play();
    }, [])

    return (
        <nav className="flex items-center justify-between flex-wrap bg-blue-900 p-4 navbar">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <canvas id="navicon" width="38" height="38"></canvas>
                <Link to="/" className="font-bold text-2xl tracking-tight">Breeze - Weather Forecast</Link>
            </div>
            <div className="w-full block justify-end md:flex md:items-center md:w-auto">
                <ul className="text-md md:flex-grow">
                    <ListLink to="/examples">Examples</ListLink>
                    <ListLink to="/about">About</ListLink>
                    <a
                        href="https://github.com/jyeung79/breeze"
                        className="inline-block px-4 py-2 border-solid border rounded text-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 md:mt-0"
                        >
                        Github
                    </a>
                </ul>
            </div>
        </nav>
    )
};

export default Navbar;