import React, { useCallback } from 'react';
import { Form, Input, Button, Popover } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import useInput from '../hooks/useInput';
import { loginAction } from '../reducers/user';

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
    const [id, onChangeId] = useInput('');
    const [password, onChangePassword] = useInput('');

    const onsubmitForm = useCallback(() => {
        console.log(id, password);
        dispatch(loginAction({ id, password }));
    }, [id, password]);

    return(
        <>  
            <FormPadding onFinish={onsubmitForm}>
                <FormGutter>
                    <label htmlFor="userId">아이디</label><br/>
                    <Input name="userId" value={id} onChange={onChangeId} required />
                </FormGutter>
                <FormGutter>
                    <label htmlFor="userPassword">비밀번호</label><br/>
                    <Input name="userPassword" value={password} onChange={onChangePassword} required />
                </FormGutter>
                <FormGutter>
                    <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
                    <Link href="/signup">
                        <a>회원가입</a>
                    </Link>
                </FormGutter>
            </FormPadding>
        </>
    )
}

export default LoginForm;