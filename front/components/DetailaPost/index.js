import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

import { Card, Avatar, List, Comment, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import ImagesView from '../imagesView';
import CommentForm from '../CommentForm';
import PostCardContent from '../PostCardContent';

import { REMOVE_COMMENT_REQUEST } from '../../reducers/post';

import { CardTop, TimeStamp } from '../style/global';
import { DetailWrapper, CloseBtn, DetailCard, DetailRow, DetailColLeft, DetailColRight, DeleteComment } from './style';

dayjs.locale('ko');
dayjs.extend(relativeTime);

const DetailPost = ({ images, post, comment, onCloseDetailPost }) => {
    const id = useSelector((state) => state.post.id);
    const userId = useSelector((state) => state.user.me?.id);
    const { removeCommentError } = useSelector((state) => state.post)

    useEffect(() => {
        if (removeCommentError) {
            return alert(removeCommentError)
        }
    }, [removeCommentError]);
    
    const dispatch = useDispatch();
    const onDeleteComment = useCallback((id) => () => {
        console.log(post, post.id, post.Comments, id);

        dispatch({
            type: REMOVE_COMMENT_REQUEST,
            data: id,
        })
    });

    return (
        <DetailWrapper>
            <CloseBtn onClick={onCloseDetailPost} />
            <DetailCard>
                <DetailRow>
                    <DetailColLeft xs={14} md={14}>
                        <ImagesView images={images} />
                    </DetailColLeft>
                    <DetailColRight xs={10} md={10}>
                        <CardTop>
                            <Card.Meta 
                                avatar={(
                                    <Link href={`user/${post.User.id}`}>
                                      <a><Avatar>{post.User.nickname[0]}</Avatar></a>
                                    </Link>
                                )}
                                title={(
                                    <Link href={`user/${post.User.id}`}>
                                      <a><b>{post.User.nickname}</b></a>
                                    </Link>
                                )}
                            />
                        </CardTop>
                        <div>
                            {/* <Comment 
                                avatar={<Avatar>{post.User.nickname[0]}</Avatar>} 
                                author={post.User.nickname}
                            /> */}
                            <PostCardContent postData={post.content} />
                            
                            <List 
                                dataSource={comment}
                                renderItem={(item) => (
                                    <Comment
                                        avatar={(
                                            <Link href={`user/${item.User.id}`}>
                                                <a><Avatar size="small">{item.User.nickname[0]}</Avatar></a>
                                            </Link>
                                        )}
                                        author={(
                                            <Link href={`user/${item.User.id}`}>
                                                <a><b>{item.User.nickname}</b></a>
                                            </Link>
                                        )}
                                        content={(
                                            <p>
                                                {item.content}
                                                <TimeStamp>{dayjs(item.createdAt).locale('ko').fromNow()}</TimeStamp>
                                            </p>
                                        )}
                                    >
                                        
                                        {userId && item.User.id === userId 
                                            ? (
                                                <DeleteComment type="text" onClick={onDeleteComment(item.id)}><DeleteOutlined /></DeleteComment>
                                                )
                                            
                                            : null
                                        }
                                        
                                    </Comment>
                                    
                                )}
                            />
                        </div>
                        <CommentForm post={post} />
                    </DetailColRight>
                </DetailRow>
            </DetailCard>
        </DetailWrapper>
    )
}

DetailPost.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object),
    onCloseDetailPost: PropTypes.func.isRequired,
}

export default DetailPost;