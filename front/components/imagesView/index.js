import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import styled, { createGlobalStyle } from 'styled-components';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';

const SliderWrapper = styled.div`
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    background-color: transparent;
`;

const SliderImageWrpper = styled.div`
    text-align: center;

    & img {
        display: block;
        max-width: 100%;
        max-height: 600px;
        margin: 0 auto;
    }
`;

const Global = createGlobalStyle`
    .slick-slide {
        display: inline-block;
        overflow: hidden;
        max-width: 100%;
        vertical-align: middle;
    }
    .slick-arrow {
        display: block;
        position: absolute;
        padding: 4px;
        z-index: 10;
        color: rgba(0, 0, 0, 0.5);
        font-size: 14px;
        text-align: center;
        background-color: rgba(220, 220, 220, 0.98);
        border-radius: 50%;
        box-shadow: 1px 1px 3px rgba(100, 100, 100, 0.4);
    }

    .slick-prev {
        left: 10px; 
        top: 50%;
        transform: translateY(-50%);
    }
    .slick-prev svg {
        position: relative;
        left: -1px;
    }
    .slick-next {
        right: 10px; 
        top: 50%;
        transform: translateY(-50%);
    }
    .slick-arrow.slick-disabled {
        opacity: 0.3;
    }

    .slick-dots {
        position: absolute;
        left: 50%;
        bottom: 10px;
        transform: translateX(-50%);
        margin: 0;
    }
    .slick-dots li {
        display: inline-block;
        margin: 0 3px;
    }
    .slick-dots li button {
        border: none;
        outline: none;
        box-shadow: none;

        display: block;
        overflow: hidden;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background-color: rgba(200, 200, 200, 0.5);
        
        text-indent: -9999em;
    }
    .slick-dots .slick-active button {
        background-color: rgba(240, 240, 240, 0.95);
    }
`;

const nextArrow = (className, style, onClick ) => {
    return (
        <div 
            className={className}
            style={{ ...style, }}
        />
    )
}

const ImagesView = ({ images }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    return (
        <SliderWrapper>
            <Global />
            <Slick
                initialSlide={0}
                afterChange={(slide) => setCurrentSlide(slide)}
                arrows={true}
                slidesToScroll={1}
                slidesToShow={1}
                infinite={false}
                dots={true}
                nextArrow={<RightOutlined />}
                prevArrow={<LeftOutlined />}
            >
                {images.map((v) => (
                    <SliderImageWrpper key={v.src}>
                        <img src={v.src} alt={v.src} />
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