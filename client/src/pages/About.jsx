import React, { useState, useEffect } from 'react';
//import axios from 'axios';

import Layout from '../components/Layout';

const About = () => (
    <Layout children={
        <>
            <h1 className="text-5xl font-medium text-center py-2">Welcome to this site</h1>
            <p>This site can be used to do the following</p>
        </>
    } />
)

export default About;