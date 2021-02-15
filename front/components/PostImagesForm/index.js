import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import { backUrl } from '../../config/config';
import { RightOutlined, LeftOutlined, CloseOutlined } from '@ant-design/icons';

import { REMOVE_IMAGE } from '../../reducers/post';

import { SliderWrapper, SliderImageWrpper, DeleteImage, Global } from './style';

const PostImagesForm = ({ images }) => {
    const [currentSlide, setCurrentSlide] = useState(1);
    const dispatch = useDispatch();
    const onRemoveImage = useCallback((index) => () => {
        dispatch({
            type: REMOVE_IMAGE,
            data: index,
        })
    });

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
            >
                {images.map((v, i) => (
                    <SliderImageWrpper key={v}>
                        <img src={`${v.src.replace(/\/thumb\//, '/original/')}`} alt={v} />
                        <DeleteImage onClick={onRemoveImage(i)}>제거</DeleteImage>
                    </SliderImageWrpper>
                ))}
            </Slick>
        </SliderWrapper>
    )
}

PostImagesForm.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default PostImagesForm;