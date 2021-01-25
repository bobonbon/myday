import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row, Col, Avatar, Layout, List, Comment } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import ImagesView from './imagesView';
import CommentForm from './CommentForm';

const DetailWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
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
    height: 100%;
`;

const DetailColRight = styled(Col)`
    overflow-y: hidden;
    height: 100%;

    & > .comment-wrapper {
        overflow-y: scroll;
        height: calc(100% - 100px)
    }
`;

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
                        <div className="comment-wrapper">
                            <Comment 
                                avatar={<Avatar>{post.User.nickname[0]}</Avatar>} 
                                author={post.User.nickname} 
                                content={post.content} 
                            />
                            
                            <List 
                                dataSource={post.Comments}
                                renderItem={(item) =>(
                                    <Comment
                                        avatar={<Avatar size="small">{item.User.nickname[0]}</Avatar>}
                                        author={item.User.nickname}
                                        content={item.content}
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