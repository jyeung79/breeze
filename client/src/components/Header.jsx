import React from 'react';
import { Helmet } from 'react-helmet';

import '../static/css/reset.css';

const Header = () => (
    <Helmet>
        <title>{pageMeta.title}</title>

        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content={pageMeta.author} />
        <meta name="description" content={pageMeta.description} />
        <meta name="keywords" content={pageMeta.keywords.join(', ')} />
    </Helmet>
);

const pageMeta = {
    title: "Breeze",
    author: "Jeffery Yeung",
    keywords: ["weather", "forecasting", "weather forecasting", "vacation"],
    description: "Breeze is a weather forecasting website that takes historical data to provide a best estimate weather",
}

export default Header;