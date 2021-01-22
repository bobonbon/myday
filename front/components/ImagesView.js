import React from 'react';
import PropTypes from 'prop-types';

const ImagesView = ({ images }) => {
    return (
        <div>
            ImagesView 만드는 중...
        </div>
    )
}

ImagesView.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object),
}

export default ImagesView;