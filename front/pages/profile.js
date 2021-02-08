import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
import axios from 'axios';

import AppLayout from '../components/AppLayout';
import UserProfile from '../components/UserProfile';
import ProfileEditForm from '../components/ProfileEditForm';
import FollowList from '../components/FollowList';
import Router from 'next/router';
import { LOAD_FOLLOWINGS_REQUEST, LOAD_FOLLOWERS_REQUEST } from '../reducers/user';

const fetcher = (url) => axios.get(url, { withCredentials: true }).then((result) => result.data);

const Profile = () => {
    const { me } = useSelector((state) => state.user);

    const [followersLimit, setFollowersLimit] = useState(3);
    const [followingsLimit, setFollowingsLimit] = useState(3);

    const { data: followersData, error: followerError } = useSWR(`http://localhost:3065/user/followers?limit=${followersLimit}`, fetcher);
    const { data: followingsData, error: followingError } = useSWR(`http://localhost:3065/user/followings?limit=${followingsLimit}`, fetcher);

    // useEffect(() => {
    //     dispatch({
    //         type: LOAD_FOLLOWERS_REQUEST,
    //     })
    // }, []);

    // useEffect(() => {
    //     dispatch({
    //         type: LOAD_FOLLOWINGS_REQUEST,
    //     })
    // }, []);

    useEffect(() => {
        if (!(me && me.id)) {
            Router.replace('/');
        }
    }, [me && me.id]);

    const loadMoreFollowers = useCallback(() => {
        setFollowersLimit((prev) => prev + 3);
    });

    const loadMoreFollowings = useCallback(() => {
        setFollowingsLimit((prev) => prev + 3);
    });

    if (!me) {
        return null;
    }

    if (followerError || followingError) {
        console.error(followerError || followingError);
        return <div>팔로잉 또는 팔로워 목록 로딩 중 에러가 발생했습니다.</div>  // return은 무조건 hooks 아래!
    }

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>내 프로필 | my day</title>
            </Head>
            <AppLayout>
                <UserProfile />
                <ProfileEditForm />
                <FollowList header="팔로우" data={followingsData} onClickMore={loadMoreFollowings} loading={!followingsData && !followingError} />
                <FollowList header="팔로워" data={followersData} onClickMore={loadMoreFollowers} loading={!followersData && !followerError} />
            </AppLayout>
        </>
    );
}

export default Profile;