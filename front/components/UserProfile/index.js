import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Avatar, Button } from 'antd';
import { LOG_OUT_REQUEST } from '../../reducers/user';
import Link from 'next/link';


const UserProfile = () => {
    const { me, logOutLoading } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const onLogout = useCallback(() => {
        dispatch({
            type: LOG_OUT_REQUEST,
        });
    }, []);

    return(
        <Card
            actions={[
                <div key="post"><Link href={`user/${me.id}`}><a>게시글 <b>{me.Posts.length}</b>개</a></Link></div>,
                <div key="follower">팔로우 <b>{me.Followings.length}</b>명</div>,
                <div key="following">팔로워 <b>{me.Followers.length}</b>명</div>,
            ]}
        >
            <Card.Meta 
                avatar={<Avatar>{me.nickname[0]}</Avatar>}
                title={me.nickname}
            />
            <Button onClick={onLogout} loading={logOutLoading}>로그아웃</Button>
        </Card>
    )
}

export default UserProfile;