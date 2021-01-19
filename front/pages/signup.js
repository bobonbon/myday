import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { Form, Input, Checkbox, Button } from 'antd';
import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';

const FormGutter = styled.div`
    margin-top: 10px;

    & a {
        margin-left: 10px;
    }

    & label {
        color: #b3b3b3;
    }
`;

const ErrorMessage = styled.div`
    color: red;
`;

const SIgnup = () => {
    const [id, onChangeId] = useInput('');
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
        console.log(id, nickname, password);
    }, [password, passwordCheck, term]);

    return (
        <>
            <AppLayout>
                <Head>
                    <meta charSet="utf-8" />
                    <title>회원가입 | my day</title>
                </Head>
                    <Form onFinish={onSubmit}>
                        <FormGutter>
                            <label htmlFor="user-id">아이디</label>
                            <br />
                            <Input name="user-id" value={id} required onChange={onChangeId} />
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
                            <Button type="primary" htmlType="submit">회원가입</Button>
                        </FormGutter>
                    </Form>
            </AppLayout>
        </>
    );
}

export default SIgnup;