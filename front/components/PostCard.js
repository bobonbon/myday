import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Card, Avatar, Button, Row, Col, Modal, Menu } from 'antd';
import { EllipsisOutlined, HeartFilled, HeartOutlined, MessageOutlined } from '@ant-design/icons'

import DetailPost from './DetailPost';
import ImagesView from './imagesView';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import FollowButton from './FollowButton';
import { REMOVE_POST_REQUEST } from '../reducers/post';

import { FormGutter, CardWrapper, CardTop } from './style/global';


const CardButton = styled(Button)`
    height: auto;
    margin: 0;
    padding: 0;
    margin-right: 10px;
    
    & + p {
        display: inline-block;
        margin-bottom: 0;
    }
`;

const PostCard = ({ post, images }) => {
    const dispatch = useDispatch();
    const id = useSelector((state) => state.user.me?.id);
    const { removePostLoading } = useSelector((state) => state.post)
    //const id = me?.id;   // === me && me.id;    optional chaning

    const [liked, setLiked] = useState(false);
    const onToggleLike = useCallback(() => {
        setLiked((prev) => !prev);
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
    }, []);

    return (
        <>
            <CardWrapper 
                cover={post.Images[0] && <ImagesView images={post.Images} />}
                // cover={<img
                //     alt="example"
                //     src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                //   />}
            >
                <CardTop>
                    <Card.Meta 
                        avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                        title={post.User.nickname}
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
                                    ? <HeartFilled style={{ color: 'red' }} onClick={onToggleLike} /> 
                                    : <HeartOutlined onClick={onToggleLike} />
                                }
                            </CardButton>
                            <CardButton type="text" size="large">
                                <MessageOutlined onClick={onOpenDetailPost} />
                            </CardButton>
                        </Button.Group>
                    </Col>
                </FormGutter>
                <FormGutter>
                    <CardButton type="text"><b>{post.User.nickname}</b></CardButton>
                    <PostCardContent postData={post.content} />
                </FormGutter>
                <FormGutter>
                    <CardButton type="text" onClick={onOpenDetailPost}><b>{post.Comments.length}개</b>의 댓글</CardButton>
                    <CommentForm post={post} />
                </FormGutter>
            </CardWrapper>
            {openDetailPost && <DetailPost post={post} images={post.Images} onCloseDetailPost={onCloseDetailPost} />}
        </>
    )
}

PostCard.propTypes = {
    post: PropTypes.shape({ //object의 속성들을 더 자세히 적어주고 싶으면 shape
        id: PropTypes.number,
        User: PropTypes.object,
        content: PropTypes.string,
        createdAt: PropTypes.object,
        Comments: PropTypes.arrayOf(PropTypes.object),
        Images: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
}

export default PostCard;