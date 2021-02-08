import React, { useCallback } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import { Menu, Input, Row, Col, Button, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { LOG_OUT_REQUEST } from '../../reducers/user';
import useInput from '../../hooks/useInput';
import Router from 'next/router';

import { GnbWrapper, InstaLogo, HeaderItem } from './style';

const Header = ({ post }) => {
    const { me, logOutLoading } = useSelector((state) => state.user);
    const id = useSelector((state) => state.user.me?.id);
    const dispatch = useDispatch();
    const [searchInput, onChangeSearchInput] = useInput('');

    const onSearch = useCallback(() => {
        Router.push(`/hashtag/${searchInput}`);
    }, [searchInput])

    const onLogout = useCallback(() => {
        dispatch({
            type: LOG_OUT_REQUEST,
        });
    }, []);

    return (
        <>
            <GnbWrapper>
                <ul className="wrapper">
                    <Row align="middle">
                        <Col span={8}>
                            <HeaderItem>
                                <Link href="/"><a><InstaLogo /></a></Link>
                            </HeaderItem>
                        </Col>
                        <Col span={8}>
                            <HeaderItem className="gnb-search">
                                <Input.Search 
                                    allowClear 
                                    style={{ verticalAlign: 'middle' }} 
                                    enterButton
                                    value={searchInput}
                                    onChange={onChangeSearchInput}
                                    onSearch={onSearch}
                                />
                            </HeaderItem>
                        </Col>
                        <Col span={8}>
                            {me 
                                ? (
                                    <HeaderItem className="user-menu">
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
                                    <HeaderItem className="user-menu">
                                        <Link href="/signup"><a>회원가입</a></Link> 
                                    </HeaderItem>
                                )
                            }
                        </Col>
                    </Row>
                </ul>
            </GnbWrapper>
        </>
    );
};

export default Header;