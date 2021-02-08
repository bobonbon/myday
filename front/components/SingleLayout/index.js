import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { Row } from 'antd';

import Header from '../Header';

import { BodyWrapper, ColPadding } from './style';

const AppLayout = ({ children }) => {
    const { me } = useSelector((state) => state.user);

    return (
        <>
            <Header />
            <BodyWrapper>
                <Row>
                    <ColPadding xs={24} md={24}>
                        {children}
                    </ColPadding>
                </Row>
            </BodyWrapper>
        </>
    );
};

export default AppLayout;