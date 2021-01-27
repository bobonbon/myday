import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Proptypes from 'prop-types';
import { Button } from 'antd';

import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';

const FollowButton = ({ post }) => {
    const dispatch = useDispatch();
    const { me, followLoading, unfollowLoading } = useSelector((state) => state.user);
    const isFollowing = me?.Followings.find((v) => v.id === post.User.id);
    const onClickButton = useCallback(() => {
        if (isFollowing) {
            dispatch({
                type: UNFOLLOW_REQUEST,
                data: post.User.id,
            })
        } else {
            dispatch({
                type: FOLLOW_REQUEST,
                data: post.User.id,
            })
        }
    }, [isFollowing])

    return (
        <Button type="text" onClick={onClickButton} loading={followLoading || unfollowLoading}>
            {isFollowing ? '팔로우취소' : '팔로우'}
        </Button>
    )
};

FollowButton.Proptypes = {
    post: Proptypes.object.isRequired,
}

export default FollowButton;