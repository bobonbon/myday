import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

import user from '../reducers/user';
import post from '../reducers/post';

import { LOAD_POSTS_REQUEST } from '../reducers/post';

const Home = () => {
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const { mainPosts, hasMorePosts, loadPostsLoading  } = useSelector((state) => state.post);

    useEffect(() => {
        dispatch({
            type: LOAD_POSTS_REQUEST,
        });
    }, []);

    useEffect(() => {
        function onScroll () {
            console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
            if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 500) {
                if (hasMorePosts && !loadPostsLoading) {
                    dispatch({
                        type: LOAD_POSTS_REQUEST,
                    });
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, [hasMorePosts, loadPostsLoading]);
    
    return (
        <AppLayout>
            {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
        </AppLayout>
    );
}

export default Home;