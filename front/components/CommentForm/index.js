import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Input } from 'antd';
import styled from 'styled-components';

import { StyleCommentForm } from '../style/global';
import useInput from '../../hooks/useInput'
import { useSelector, useDispatch } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../../reducers/post';

const InputComment = styled(Input.Search)`

    button {
        color: tomato;
        border: none;
        background-color: #fff;
        box-shadow: none;
    }

    button:hover,
    button:active,
    button:focus {
        color: tomato;
        border: none;
        background-color: #fff;
    }
`;

const CommentForm = ({ post }) => {
    const dispatch = useDispatch();
    const id = useSelector((state) => state.user.me?.id);
    const { addCommentDone } = useSelector((state) => state.post);
    const [commentText, onChangeCommentText, setCommentText] = useInput('');

    useEffect(() => {
        if (addCommentDone) {
            setCommentText('');
        }
    }, [addCommentDone]);

    const onSubmitComment = useCallback(() => {
        console.log(post.id, commentText);
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: { content: commentText, postId: post.id, userId: id },
        })
    }, [commentText, id]);

    return (
        <StyleCommentForm>
            <Row align="middle" style={{ height: '100%' }}>
                <Col span={24}>
                    <InputComment 
                        placeholder="댓글 입력" 
                        value={commentText}
                        onChange={onChangeCommentText} 
                        onSearch={onSubmitComment} 
                        bordered={false} 
                        enterButton="게시"
                    />
                </Col>
            </Row>
        </StyleCommentForm>
    )
}

CommentForm.propTypes = {
    post: PropTypes.object.isRequired,
}

export default CommentForm;