import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import GlobalStyle from '../components/style/global';
import 'antd/dist/antd.css';
// import '../components/style/custom.css';

import wrapper from '../store/configureStore';

const App = ({ Component}) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>my day</title>
            </Head>
            <Component />
            <GlobalStyle />
        </>
    )
}

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
}

export default wrapper.withRedux(App);