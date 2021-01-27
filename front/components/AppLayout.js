import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import { Menu, Input, Row, Col, Button, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import PostForm from './PostForm';
import LoginForm from './LoginForm';
import { LOG_OUT_REQUEST } from '../reducers/user';

const GnbWrapper = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%; 
    height: auto;
    background-color: #fff;
    border-bottom: 1px solid #dbdbdb;
    z-index: 10;
`;

const HeaderItem = styled.li`
    display: inline-block;
    min-width: 100px;
    padding: 10px 0;
`;

const BodyWrapper = styled.div`
    max-width: 975px;
    margin: 0 auto;
    padding: 60px 20px;
`;


const AppLayout = ({ children }) => {
    const { me, logOutLoading } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const onLogout = useCallback(() => {
        dispatch({
            type: LOG_OUT_REQUEST,
        });
    }, []);

    return (
        <div>
            <GnbWrapper>
                <ul className="wrapper">
                    <Row align="middle">
                        <Col span={8}>
                            <HeaderItem>
                                <Link href="/"><a>메인</a></Link>
                            </HeaderItem>
                        </Col>
                        <Col span={8}>
                            <HeaderItem>
                                <Input.Search allowClear style={{ verticalAlign: 'middle' }} />
                            </HeaderItem>
                        </Col>
                        <Col span={8}>
                            {me 
                                ? (
                                    <HeaderItem>
                                        <Dropdown  
                                            placement="bottomRight"
                                            trigger="click" 
                                            placement="topRight" 
                                            arrow
                                            overlay={(
                                                <Menu>
                                                    <Menu.Item>
                                                        <Link href="/mypage"><a>마이페이지</a></Link>
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        <Link href="/profile"><a>프로필</a></Link>
                                                    </Menu.Item>
                                                    <Menu.Divider />
                                                    <Menu.Item>
                                                        <Button onClick={onLogout} loading={logOutLoading}>로그아웃</Button>
                                                    </Menu.Item>
                                                </Menu>
                                            )}
                                        >
                                            <Button shape="circle">
                                                <UserOutlined />
                                            </Button>
                                        </Dropdown>
                                    </HeaderItem>
                                )
                                : (
                                    <HeaderItem>
                                        <Link href="/signup"><a>회원가입</a></Link> 
                                    </HeaderItem>
                                )
                            }
                        </Col>
                    </Row>
                </ul>
            </GnbWrapper>
            <BodyWrapper>
                <Row>
                    <Col xs={24} md={16}>
                        {children}
                    </Col>
                    <Col xs={24} md={8}>
                        {me 
                            ? <PostForm />
                            : <LoginForm />
                        } 
                    </Col>
                </Row>
            </BodyWrapper>
            
        </div>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AppLayout;