import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Input, Button } from 'antd'
import { useSelector } from 'react-redux';

const PostCardContent = ({ postData, editMode, onChangePost, onCancelUpdatePost }) => {
    const [editText, setEditText] = useState(postData);
    const { updatePostLoading, updatePostDone } = useSelector((state) => state.post);

    useEffect(() => {
        if (updatePostDone) {
            onCancelUpdatePost();
        }
    }, [updatePostDone]);

    const onChangeText = useCallback((e) => {
        setEditText(e.target.value);
    })

    return (
        <span>
            {editMode 
                ? (
                    <div>
                        <Input.TextArea value={editText} onChange={onChangeText} />
                        <Button.Group>
                            <Button onClick={onCancelUpdatePost}>취소</Button>
                            <Button type="primary" loading={updatePostLoading} onClick={onChangePost(editText)}>수정</Button>
                        </Button.Group>
                    </div>
                )
                : (
                    postData.split(/(#[^\s#]+)/g).map((v, i) => {
                        if (v.match(/(#[^\s#]+)/)) {
                            return ( 
                                <Link href={`/hashtag/${v.slice(1)}`} prefetch={false} key={i}>
                                    <a>{v}</a>
                                </Link>
                            )
                        }
                        return v;
                    })
                )
            }
            {/* {postData.split(/(#[^\s#]+)/g).map((v, i) => {
                if (v.match(/(#[^\s#]+)/)) {
                    return ( 
                        <Link href={`/hashtag/${v.slice(1)}`} prefetch={false} key={i}>
                            <a>{v}</a>
                        </Link>
                    )
                }
                return v;
            })} */}
        </span>
    )
}

PostCardContent.propTypes = {
    postData: PropTypes.string.isRequired,
    editMode: PropTypes.bool,
    onCancelUpdatePost: PropTypes.func.isRequired,
    onChangePost: PropTypes.func.isRequired,
    
}

PostCardContent.defaultProps = {
    editMode: false,
}

export default PostCardContent;