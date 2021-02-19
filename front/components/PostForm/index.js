import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostImagesForm from '../PostImagesForm';
import useInput from '../../hooks/useInput';

import { Row, Button, Form, Input } from 'antd';
import { FormGutter } from '../style/global';
import { FileImageOutlined } from '@ant-design/icons';
import { AddImagesButton, FormTitle, PostFormWrap, PostFormCol, SubmitButton } from './style';

import { addPost, UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE, ADD_POST_REQUEST } from '../../reducers/post';

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

    const onChangeImages = useCallback((e) => {
        console.log('images', e.target.files);
        const imageFormData = new FormData();   // FormData로 보내야 multipart로 데이터 전송 가능
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append('image', f);   // 여기 'image'가 백 라우터의 그 'image' 맞음
        });
        dispatch({
            type: UPLOAD_IMAGES_REQUEST,
            data: imageFormData,
        });
    }, []);

    const onRemoveImage = useCallback((index) => () => {
        dispatch({
            type: REMOVE_IMAGE,
            data: index,
        })
    });

    const onSubmit = useCallback(() => {
        if (imagePaths.length === 0) {
            return alert('한 개 이상의 이미지를 첨부해주세요.');
        }

        if (!text || !text.trim()) {
            return alert('게시글을 작성해주세요.');
        }

        const formData = new FormData();
        imagePaths.forEach((p) => {
            formData.append('image', p);
        });
        formData.append('content', text);   //req.body.content
        console.log('폼데이터', formData, text);

        return dispatch({
            type: ADD_POST_REQUEST,
            data: formData,
        });
    }, [text, imagePaths]);

    return (
        <>
            <Form style={{ margin: '10px 0' }} encType="multipart/form-data" onFinish={onSubmit}>
                <FormTitle>새 게시글 작성</FormTitle>
                <PostFormWrap>
                    <PostFormCol>
                        {imagePaths.length === 0 && 
                            <AddImagesButton onClick={onClickImageUpload} alt="이미지 업로드" title="이미지 업로드">
                                <FileImageOutlined />
                            </AddImagesButton>
                        }
                        <PostImagesForm images={imagePaths} />
                        <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages} />
                    </PostFormCol>
                    <PostFormCol>
                        <FormGutter>
                        <Input.TextArea 
                            value={text} 
                            onChange={onChangeText} 
                            placeholder="오늘의 끄적끄적" 
                        />
                        </FormGutter>
                    </PostFormCol>
                    <SubmitButton type="primary" htmlType="submit" loading={addPostLoading}>작성</SubmitButton>
                </PostFormWrap>
                {/* <FormGutter>
                    {imagePaths.map((v, i) => (
                        <div key={v} style={{ display: 'inline-block', position: 'relative' }}>
                            <img src={`http://localhost:3065/${v}`} style={{ display: 'inline-block', maxWidth: '100%' }} alt={v} />
                            <CloseOutlined style={{ position: 'absolute', right: '0', top: '0', padding: '5px', color: 'rgba(100 ,100 ,100 ,0.8)', cursor: 'pointer', zIndex: '1' }} onClick={onRemoveImage(i)}>제거</CloseOutlined>
                        </div>
                    ))}
                </FormGutter> */}
            </Form>
        </>
    )
};

export default PostForm;