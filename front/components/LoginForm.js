import React, { useCallback, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../hooks/useInput';
import { LOG_IN_REQUEST } from '../reducers/user';

const FormPadding = styled(Form)`
    padding: 10px 20px;
`;

const FormGutter = styled.div`
    margin-top: 10px;

    & a {
        margin-left: 10px;
    }

    & label {
        color: #b3b3b3;
    }
`;

const LoginForm = () => {
    const dispatch = useDispatch();
    const { logInLoading, logInError } = useSelector((state) => state.user);
    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');

    useEffect(() => {
        if (logInError) {
            alert(logInError);
        }
    }, [logInError])

    const onsubmitForm = useCallback(() => {
        console.log(email, password);
        dispatch({
            type: LOG_IN_REQUEST,
            data: { email, password },
        });
    }, [email, password]);

    return(
        <>  
            <FormPadding onFinish={onsubmitForm}>
                <FormGutter>
                    <label htmlFor="user-email">이메일</label><br/>
                    <Input name="user-email" value={email} onChange={onChangeEmail} required />
                </FormGutter>
                <FormGutter>
                    <label htmlFor="userPassword">비밀번호</label><br/>
                    <Input name="userPassword" type="password" value={password} onChange={onChangePassword} required />
                </FormGutter>
                <FormGutter>
                    <Button type="primary" htmlType="submit" loading={logInLoading}>로그인</Button>
                    <Link href="/signup">
                        <a>회원가입</a>
                    </Link>
                </FormGutter>
            </FormPadding>
        </>
    )
}

export default LoginForm;