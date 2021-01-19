import React from 'react';
import Head from 'next/head';

import AppLayout from '../components/AppLayout';
import ProfileEditForm from '../components/ProfileEditForm';
import FollowList from '../components/FollowList';

const Profile = () => {
    const followerList = [{ nickname: '진짜보봉뽕' }, { nickname: '그림자분신보봉뽕' }, { nickname: '보봉뿅' }]
    const followList = [{ nickname: '뽀보봉' }, { nickname: '뾰뿅뿅' }, { nickname: '뽕뽕뽕' }]
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>내 프로필 | my day</title>
            </Head>
            <AppLayout>
                <ProfileEditForm />
                <FollowList header="팔로워" data={followerList} />
                <FollowList header="팔로우" data={followList} />
            </AppLayout>
        </>
    );
}

export default Profile;