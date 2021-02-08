import styled from 'styled-components';
import { Card } from 'antd';

export const ProfileStyle = styled(Card)`
    border: 1px solid #dbdbdb;

    & button {
        float: right;
    }

    & .ant-card-actions {
        position: absolute;
    }
`