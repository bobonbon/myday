import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

import { Card, Avatar, Button, Col, Modal, Menu } from 'antd';
import { EllipsisOutlined, HeartFilled, HeartOutlined, MessageOutlined } from '@ant-design/icons'

import DetailPost from '../DetailaPost';
import ImagesView from '../imagesView';
import CommentForm from '../CommentForm/';
import PostCardContent from '../PostCardContent';
import FollowButton from '../FollowButton';
import { REMOVE_POST_REQUEST, LIKE_POST_REQUEST, UNLIKE_POST_REQUEST } from '../../reducers/post';

import { FormGutter, CardWrapper, CardTop, TimeStamp } from '../style/global';
import { Global, CardButton, ThumbItem } from './style';

dayjs.locale('ko');
dayjs.extend(relativeTime);

const PostThumb = ({ post, images }) => {
    const dispatch = useDispatch();
    const id = useSelector((state) => state.user.me?.id);
    const { removePostLoading } = useSelector((state) => state.post)
    //const id = me?.id;   // === me && me.id;    optional chaning
    
    const liked = post.Likers.find((v) => v.id === id); // 게시글 좋아한 사람 중에 내가 있는가
    const onLike = useCallback(() => {
        if (!id) {
            return alert('로그인이 필요합니다.');
        }
        dispatch({
            type: LIKE_POST_REQUEST,
            data: post.id,
        })
    }, []);
    const onUnlike = useCallback(() => {
        if (!id) {
            return alert('로그인이 필요합니다.');
        }
        dispatch({
            type: UNLIKE_POST_REQUEST,
            data: post.id,
        })
    }, []);

    const [openDetailPost, setOpenDetailPost] = useState(false);
    const onOpenDetailPost = useCallback(() => {
        setOpenDetailPost(true);
    }, []);
    const onCloseDetailPost = useCallback(() => {
        setOpenDetailPost(false);
    }, [])

    //antd modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onRemovePost = useCallback(() => {
        dispatch({
            type: REMOVE_POST_REQUEST,
            data: post.id,
          });
        setIsModalVisible(false);
    }, []);

    return (
        <>
            <Link href={`http://localhost:3060/post/${post.id}`}>
                <a>
                    <ThumbItem>
                        {post.Images[0] 
                            ? (
                                
                                    <img src={`http://localhost:3065/${post.Images[0].src}`} />
                                
                            ) 
                            : (
                                <img src="http://placehold.it/300x300/333333/333333" />
                            ) 
                        }
                    </ThumbItem>
                </a>
            </Link>
        </>
    )
}

PostThumb.propTypes = {
    post: PropTypes.shape({ //object의 속성들을 더 자세히 적어주고 싶으면 shape
        id: PropTypes.number,
        User: PropTypes.object,
        content: PropTypes.string,
        createdAt: PropTypes.string,
        Comments: PropTypes.arrayOf(PropTypes.object),
        Images: PropTypes.arrayOf(PropTypes.object),
        Likers: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
}

export default PostThumb;