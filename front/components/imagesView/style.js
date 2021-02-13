import styled, { createGlobalStyle } from 'styled-components';

export const SliderWrapper = styled.div`
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
    background-color: transparent; 

    & .slick-slider {
        height: 100%;
    }

    & .slick-list {
        height: 100% !important;
        text-align: center;
    }
    
    & .slick-track {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    & .slick-slide {
        float: none;
    }
`;

export const SliderImageWrpper = styled.div`
    text-align: center;
    
    & img {
        max-width: 100%;
        max-height: 500px;
    }
`;
    
export const Global = createGlobalStyle` 
    .ant-card-cover {
        transform: none !important;
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