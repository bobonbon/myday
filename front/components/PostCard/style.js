import styled, { createGlobalStyle } from 'styled-components';
import { Button } from 'antd';
export const Global = createGlobalStyle`
    .ant-card-meta-avatar {
        padding-right: 8px;
    }
    .ant-card-meta-title a {
        color: #111;
        font-size: 14px;
    }
`;

export const CardButton = styled(Button)`
    height: auto;
    margin: 0;
    padding: 0;
    margin-right: 10px;
    
    & + p {
        display: inline-block;
        margin-bottom: 0;
    }
`;