import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { FormGutter, FormPadding } from './style/global';

import { addPost } from '../reducers/post';
import useInput from '../hooks/useInput';

const PostForm = () => {
    const dispatch = useDispatch();
    const { imagePaths, addPostLoading, addPostDone } = useSelector((state) => state.post);
    
    const [text, onChangeText, setText] = useInput('');

    useEffect(() => {
        if (addPostDone) {
            setText('');
        }
    }, [addPostDone]);

    const imageInput = useRef();
    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

    const onSubmit = useCallback(() => {
        dispatch(addPost(text));
    }, [text]);

    return (
        <>
            <FormPadding style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
                <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder="오늘의 기록을 남겨보세요." />
                <FormGutter>
                    <input type="file" multiple hidden ref={imageInput} />
                    <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                    <Button type="primary" style={{ float: 'right' }} htmlType="submit" loading={addPostLoading}>작성</Button>
                </FormGutter>
                <FormGutter>
                    {imagePaths.map((v) => (
                        <div key={v} style={{ display: 'inline-block' }}>
                            <img src={v} style={{ display: 'inline-block', maxWidth: '200px' }} alt={v} />
                            <Button>제거</Button>
                        </div>
                    ))}
                </FormGutter>
            </FormPadding>
        </>
    )
};

export default PostForm;