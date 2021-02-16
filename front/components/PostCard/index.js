import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

import { Card, Avatar, Button, Col, Modal, Menu } from 'antd';
import { EllipsisOutlined, HeartFilled, HeartOutlined, MessageOutlined } from '@ant-design/icons'

import DetailPost from '../DetailPost';
import ImagesView from '../imagesView';
import CommentForm from '../CommentForm/';
import PostCardContent from '../PostCardContent';
import FollowButton from '../FollowButton';
import { REMOVE_POST_REQUEST, LIKE_POST_REQUEST, UNLIKE_POST_REQUEST } from '../../reducers/post';

import { FormGutter, CardWrapper, CardTop, TimeStamp } from '../style/global';
import { Global, CardButton } from './style';

dayjs.locale('ko');
dayjs.extend(relativeTime);

const PostCard = ({ post, images }) => {
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
            <Global />
            <CardWrapper 
                cover={post.Images[0] && <ImagesView images={post.Images} />}
            >
                <CardTop>
                    <Card.Meta 
                        avatar={(
                            <Link href={`/user/${post.User.id}`} prefetch={false}>
                                <a><Avatar>{post.User.nickname[0]}</Avatar></a>
                            </Link>
                        )}
                        title={(
                            <Link href={`/user/${post.User.id}`} prefetch={false}>
                                <a><b>{post.User.nickname}</b></a>
                            </Link>
                        )}
                    />
                    <Button type="link" onClick={showModal}>
                        <EllipsisOutlined />
                    </Button>
                    <Modal 
                        bodyStyle={{ padding: '30px 10px 10px' }}
                        width={300}  
                        visible={isModalVisible}
                        onCancel={handleCancel}
                        centered
                        footer={null}
                    > 
                        <Menu>
                            {id && post.User.id === id 
                                ? (
                                    <>
                                        <Menu.Item>
                                            <Button type="text">수정</Button>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <Button danger type="text" onClick={onRemovePost} loading={removePostLoading}>삭제</Button>
                                        </Menu.Item>
                                    </>
                                ) : (
                                        <Menu.Item>
                                            <FollowButton post={post} />
                                        </Menu.Item>
                                )   
                            }
                        </Menu>
                    </Modal>
                </CardTop>
                <FormGutter>
                    <Col span={6}>
                        <Button.Group>
                            <CardButton type="text" size="large">
                                {liked 
                                    ? <HeartFilled style={{ color: 'red' }} onClick={onUnlike} /> 
                                    : <HeartOutlined onClick={onLike} />
                                }
                            </CardButton>
                            <CardButton type="text" size="large">
                                <MessageOutlined onClick={onOpenDetailPost} />
                            </CardButton>
                        </Button.Group>
                    </Col>
                </FormGutter>
                <FormGutter>
                    <CardButton type="text"><Link href={`/user/${post.User.id}`} prefetch={false}><a><b>{post.User.nickname}</b></a></Link></CardButton>
                    <PostCardContent postData={post.content} />
                    <TimeStamp>{dayjs(post.createdAt).locale('ko').fromNow()}</TimeStamp>
                </FormGutter>
                <FormGutter>
                    <CardButton type="text" onClick={onOpenDetailPost}><b>{post.Comments.length}개</b>의 댓글</CardButton>
                    <CommentForm post={post} />
                </FormGutter>
            </CardWrapper>
            {openDetailPost && <DetailPost post={post} images={post.Images} comments={post.Comments} onCloseDetailPost={onCloseDetailPost} />}
        </>
    )
}

PostCard.propTypes = {
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

export default PostCard;