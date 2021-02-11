import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';

import { SliderWrapper, SliderImageWrpper, Global } from './style';

const ImagesView = ({ images }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    return (
        <SliderWrapper>
            <Global />
            <Slick
                initialSlide={0}
                beforeChange={(slide) => setCurrentSlide(slide)}
                arrows={true}
                slidesToScroll={1}
                slidesToShow={1}
                infinite={false}
                dots={true}
                nextArrow={<RightOutlined />}
                prevArrow={<LeftOutlined />}
                adaptiveHeight={true}
            >
                {images.map((v) => (
                    <SliderImageWrpper key={v.src}>
                        <img src={`http://localhost:3065/${v.src}`} alt={v.src} />
                    </SliderImageWrpper>
                ))}
            </Slick>
        </SliderWrapper>
    )
}

ImagesView.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default ImagesView;