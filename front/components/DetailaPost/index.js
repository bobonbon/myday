import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

import { Card, Avatar, List, Comment } from 'antd';

import ImagesView from '../imagesView';
import CommentForm from '../CommentForm';
import PostCardContent from '../PostCardContent';

import { CardTop, TimeStamp } from '../style/global';
import { DetailWrapper, CloseBtn, DetailCard, DetailRow, DetailColLeft, DetailColRight } from './style';

dayjs.locale('ko');
dayjs.extend(relativeTime);

const DetailPost = ({ images, post, onCloseDetailPost }) => {
    const id = useSelector((state) => state.post.id);
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
                                dataSource={post.Comments}
                                renderItem={(item) =>(
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
                                    />
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