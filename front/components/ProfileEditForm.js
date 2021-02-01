import React, { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from 'antd';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';
import useInput from '../hooks/useInput';

const ProfileEditForm = () => {
    const style = useMemo(() => ({
        marginBottom: '20px',
        border: '1px solid #dbdbdb',
        padding: '10px 20px',
    }));

    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const [nickname, onChangeNickname] = useInput(me?.nickname || '');
    const onSubmit = useCallback(() => {
        dispatch({
            type: CHANGE_NICKNAME_REQUEST,
            data: nickname,
        })
    }, [nickname])

    return(
        <>
            <Form style={style}>
                <Input.Search 
                    value={nickname}
                    addonBefore="닉네임"
                    enterButton="수정" 
                    onChange={onChangeNickname} 
                    onSearch={onSubmit}
                />
            </Form>
        </>
    )
}

export default ProfileEditForm;