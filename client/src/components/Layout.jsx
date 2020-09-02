import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }) => (
    <>
        <Header />
        <Navbar />
        <div className="container mx-auto my-4">
            { children }
        </div>
        <Footer />
    </>
);

export default Layout;

