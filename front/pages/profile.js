import React from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';

import AppLayout from '../components/AppLayout';
import UserProfile from '../components/UserProfile';
import ProfileEditForm from '../components/ProfileEditForm';
import FollowList from '../components/FollowList';


const Profile = () => {
    const { me } = useSelector((state) => state.user);
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>내 프로필 | my day</title>
            </Head>
            <AppLayout>
                <UserProfile />
                <ProfileEditForm />
                <FollowList header="팔로워" data={me.Followings} />
                <FollowList header="팔로우" data={me.Followers} />
            </AppLayout>
        </>
    );
}

export default Profile;