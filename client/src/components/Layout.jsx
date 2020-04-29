import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }) => (
    <>
        <Header />
        <Navbar />
        { children }
        <Footer />
    </>
);

export default Layout;

