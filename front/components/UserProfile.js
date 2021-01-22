import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Avatar, Button } from 'antd';
import { logoutAction } from '../reducers';

const UserProfile = () => {
    const dispatch = useDispatch();
    const onLogout = useCallback(() => {
        setIsLoggedIn(false);
        dispatch(logoutAction());
    }, []);

    return(
        <Card
            actions={[
                <div key="post">게시글 <b>0</b></div>,
                <div key="follower">팔로워 <b>0</b></div>,
                <div key="follow">팔로우 <b>0</b></div>,
            ]}
        >
            <Card.Meta 
                avatar={<Avatar>bb</Avatar>}
                title="bobonbon"
            />
            <Button onClick={onLogout}>로그아웃</Button>
        </Card>
    )
}

export default UserProfile;