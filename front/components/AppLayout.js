import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col, Button, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import UserProfile from './UserProfile';
import LoginForm from './LoginForm';


const GnbWrapper = styled.div`
    width: 100%; 
    height: auto;
    backgroud-color: #f6f6f6;
    border-bottom: 1px solid #dbdbdb;
`;

const HeaderItem = styled.li`
    display: inline-block;
    min-width: 100px;
    padding: 10px 0;
`;


const AppLayout = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState();
    
    const onLogout = useCallback(() => {
        setIsLoggedIn(false);
        console.log('logout in AppLayout');
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
                            {isLoggedIn 
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
                                                        <Link href="/profile"><a>프로필</a></Link>
                                                    </Menu.Item>
                                                    <Menu.Divider />
                                                    <Menu.Item>
                                                        <Button onClick={onLogout}>로그아웃</Button>
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
            <div className="wrapper">
                <Row>
                    {isLoggedIn
                        ? (
                            <Col xs={24} md={24}>
                                {children}
                            </Col>
                        )
                        : (
                            <Col xs={24} md={18}>
                                {children}
                            </Col>
                        )
                    }
                    {isLoggedIn
                        ? <div>로그인 됨!!</div>
                        : (
                            <Col xs={24} md={6}>
                                <LoginForm setIsLoggedIn={setIsLoggedIn} />
                            </Col>
                        )
                    }
                </Row>
            </div>
            
        </div>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AppLayout;