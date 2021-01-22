import React, { useMemo } from 'react';
import { Form, Input } from 'antd';

const ProfileEditForm = () => {
    const style = useMemo(() => ({
        marginBottom: '20px',
        border: '1px solid #dbdbdb',
        padding: '10px 20px',
    }));

    return(
        <>
            <Form style={style}>
                <Input.Search addonBefore="닉네임" enterButton="수정" />
            </Form>
        </>
    )
}

export default ProfileEditForm;