import React from 'react';
import PropTypes from 'prop-types';
import "@material-ui/core/styles";

const App = ({ Component}) => {
    return (
        <Component />
    )
}

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
}

export default App;