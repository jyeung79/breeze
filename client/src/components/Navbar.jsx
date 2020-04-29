import React from 'react';
import '../static/css/reset.css';
import '../static/css/styles.css';
import { Link } from "react-router-dom";

const ListLink = props => (
	<li className="block mt-4 md:inline-block md:mt-0 text-gray-200 hover:text-black mr-4">
	  <Link to={props.to}>{props.children}</Link>
	</li>
)

const Navbar = () => (
    <nav className="flex items-center justify-between flex-wrap bg-blue-900 p-4 navbar navbar-expand-sm">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
            <canvas id="navicon" width="38" height="38"></canvas>
            <Link to="/" className="font-bold text-2xl tracking-tight">Breeze - Weather Forecast</Link>
        </div>
        <div className="block md:hidden">
            <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
            </button>
        </div>
        <div className="w-full block flex-grow md:flex md:items-center md:w-auto">
            <ul className="text-md md:flex-grow">
                <ListLink to="/examples">Examples</ListLink>
                <ListLink to="/about">About</ListLink>
            </ul>
                <Link 
                    to="/examples"
                    className="inline-block px-4 py-2 border-solid border rounded text-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 md:mt-0"
                >
                    Github
                </Link>
        </div>
    </nav>
);

export default Navbar;