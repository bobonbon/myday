import React, { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import styled from 'styled-components';
import { END } from 'redux-saga';
import axios from 'axios';

import { Form, Input, Checkbox, Button } from 'antd';
import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import wrapper from '../store/configureStore';
import { FormGutter } from '../components/style/global';
import { LOAD_MY_INFO_REQUEST, SIGN_UP_REQUEST } from '../reducers/user';

const ErrorMessage = styled.div`
    color: red;
`;

const SIgnup = () => {
    const dispatch = useDispatch();
    const { signUpLoading, signUpDone, signUpError, me } = useSelector((state) => state.user);

    useEffect(() => {
        if (me && me.id) {
            Router.replace('/');
        }
    }, [me && me.id]);

    useEffect(() => {
        if (signUpDone) {
            Router.replace('/');
        }
    }, [signUpDone]);

    useEffect(() => {
        if (signUpError) {
            alert(signUpError);
        }
    }, [signUpError])
    
    const [email, onChangeEmail] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
    const [password, onChangePassword] = useInput('');

    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value);
        setPasswordError(e.target.value !== password);
    }, [password]);
    
    const [term, setTerm] = useState('');
    const [termError, setTermError] = useState(false);
    const onChangeTerm = useCallback((e) => {
        setTerm(e.target.checked);
        setTermError(false);
    }, []);

    const onSubmit = useCallback(() => {
        if (password !== passwordCheck) {
            return setPasswordError(true);
        }
        if (!term) {
            return setTermError(true);
        }
        return dispatch({
            type: SIGN_UP_REQUEST,
            data: {
                email, 
                password, 
                nickname,
            }
        })
    }, [email, password, passwordCheck, term]);

    return (
        <>
            <AppLayout>
                <Head>
                    <meta charSet="utf-8" />
                    <title>회원가입 | my day</title>
                </Head>
                    <Form onFinish={onSubmit}>
                        <FormGutter>
                            <label htmlFor="user-email">이메일</label>
                            <br />
                            <Input name="user-email" type="email" value={email} required onChange={onChangeEmail} />
                        </FormGutter>
                        <FormGutter>
                            <label htmlFor="user-nickname">닉네임</label>
                            <br />
                            <Input name="user-nickname" value={nickname} required onChange={onChangeNickname} />
                        </FormGutter>
                        <FormGutter>
                            <label htmlFor="user-password">비밀번호</label>
                            <br />
                            <Input name="user-password" type="password" value={password} required onChange={onChangePassword} />
                        </FormGutter>
                        <FormGutter>
                            <label htmlFor="user-password-check">비밀번호 확인</label>
                            <br />
                            <Input 
                                name="user-password-check" 
                                type="password" 
                                value={passwordCheck} 
                                required 
                                onChange={onChangePasswordCheck} 
                            />
                            {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
                        </FormGutter>
                        <FormGutter>
                            <Checkbox
                                name="user-term"
                                checked={term}
                                onChange={onChangeTerm}
                            >
                                좋은 하루를 보내겠습니다.
                            </Checkbox>
                            {termError && <ErrorMessage>좋은 하루를 보내겠다고 약속하셔야 합니다.</ErrorMessage>}
                        </FormGutter>
                        <FormGutter>
                            <Button type="primary" htmlType="submit" loading={signUpLoading}>회원가입</Button>
                        </FormGutter>
                    </Form>
            </AppLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});

export default SIgnup;