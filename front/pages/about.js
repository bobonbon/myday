import React, { useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';

import AppLayout from '../components/AppLayout';
import { LOAD_USER_REQUEST } from '../reducers/user'
import { Card, Avatar } from 'antd';
import wrapper from '../store/configureStore';

const About = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.user);

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>내 프로필 | my day</title>
            </Head>
            <AppLayout>
                {userInfo 
                    ? (
                        <Card
                            actions={[
                                <div key="post">게시글 {userInfo.Posts}</div>,
                                <div key="follow">팔로우 {userInfo.Followings}</div>,
                                <div key="follower">팔로워 {userInfo.Followers}</div>,
                            ]}
                        >
                            <Card.Meta 
                                avartar={<Avatar>{userInfo.nickname[0]}</Avatar>}
                                title={userInfo.nickname}
                                description="내가 1번 회원이다."
                            />
                        </Card>
                    ) : null
                }
            </AppLayout>
        </>
    );
};

export const getStaticProps = wrapper.getStaticProps(async (context) => {
    context.store.dispatch({
        type: LOAD_USER_REQUEST,
        data: 1,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});

export default About;