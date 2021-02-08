import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

import { Row, Col, Avatar, Layout, List, Comment } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import ImagesView from '../imagesView';
import CommentForm from '../CommentForm';
import PostCardContent from '../PostCardContent';

import { FormGutter, CardWrapper, CardTop } from '../style/global';
import { Card, Button, Modal, Menu } from 'antd';

const DetailWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
`;

const CloseBtn = styled(CloseOutlined)`
    position: absolute;
    right: 10px;
    top: 10px;
    padding: 10px;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
`;

const DetailCard = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% - 100px);
    max-width: 860px;
    min-width: 500px;
    height: 90vh;
    max-height: 500px;
    background-color: #fff;
`;

const DetailRow = styled(Row)`
    height: 100%;
`;

const DetailColLeft = styled(Col)`
    position: relative;
    height: 100%;
    background-color: #000;

    & .slick-slider.slick-initialized {
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
    }
`;

const DetailColRight = styled(Col)`
    overflow-y: hidden;
    height: 100%;
    padding-top: 60px;

    & > div:last-of-type {
        overflow-y: scroll;
        height: calc(100% - 50px);
        padding-left: 20px;
    }

    & > div:last-of-type > span {
        display: block;
        padding: 20px 0 10px;
    }
`;

dayjs.locale('ko');
dayjs.extend(relativeTime);

const DetailPost = ({ images, post, onCloseDetailPost }) => {
    const id = useSelector((state) => state.post.id);
    return (
        <DetailWrapper>
            <CloseBtn onClick={onCloseDetailPost} />
            <DetailCard>
                <DetailRow>
                    <DetailColLeft xs={24} md={14}>
                        <ImagesView images={images} />
                    </DetailColLeft>
                    <DetailColRight xs={24} md={10}>
                        <CardTop>
                            <Card.Meta 
                                avatar={(
                                    <Link href={`user/${post.User.id}`}>
                                      <a><Avatar>{post.User.nickname[0]}</Avatar></a>
                                    </Link>
                                )}
                                title={(
                                    <Link href={`user/${post.User.id}`}>
                                      <a>{post.User.nickname}</a>
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
                                                <a>{item.User.nickname}</a>
                                            </Link>
                                        )}
                                        content={(
                                            <div>
                                                {item.content}
                                                <div>{dayjs(item.createdAt).locale('ko').fromNow()}</div>
                                            </div>
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