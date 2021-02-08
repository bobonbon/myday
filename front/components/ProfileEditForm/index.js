import React, { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from 'antd';
import { CHANGE_NICKNAME_REQUEST } from '../../reducers/user';
import useInput from '../../hooks/useInput';

import { ProfileEditStyle } from './style';

const ProfileEditForm = () => {
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
            <ProfileEditStyle>
                <Input.Search 
                    value={nickname}
                    addonBefore="닉네임"
                    enterButton="수정" 
                    onChange={onChangeNickname} 
                    onSearch={onSubmit}
                />
            </ProfileEditStyle>
        </>
    )
}

export default ProfileEditForm;