import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { Row } from 'antd';

import Header from '../Header';
import PostForm from '../PostForm';
import LoginForm from '../LoginForm';

import { BodyWrapper, ColPadding} from './style';

const AppLayout = ({ children }) => {
    const { me } = useSelector((state) => state.user);

    return (
        <>
            <Header />
            <BodyWrapper>
                <Row>
                    <ColPadding xs={24} md={8}>
                        {me 
                            ? <PostForm />
                            : <LoginForm />
                        } 
                    </ColPadding>
                    <ColPadding xs={24} md={16}>
                        {children}
                    </ColPadding>
                </Row>
            </BodyWrapper>
            
        </>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AppLayout;