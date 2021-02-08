import styled, { createGlobalStyle } from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

export const SliderWrapper = styled.div`
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    background-color: transparent;
`;

export const SliderImageWrpper = styled.div`
    position: relative;
    text-align: center;

    & img {
        display: block;
        max-width: 100%;
        max-height: 500px;
        margin: 0 auto;
    }
`;

export const DeleteImage = styled(CloseOutlined)`
    position: absolute;
    right: 10px;
    top: 10px;
    width: 25px;
    height: 25px;
    padding: 5px;
    color: #fff;
    text-aling: center;
    line-height: 20px;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    cursor: pointer;
    z-index: 1;
`

export const Global = createGlobalStyle`
    .slick-track:after {
        display: block;
        clear: both;
        content: ""
    }
    .slick-slide {
        display: block;
        overflow: hidden;
        float: left;
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