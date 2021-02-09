import styled, { createGlobalStyle } from 'styled-components';
import { Button } from 'antd';
export const Global = createGlobalStyle`
    .ant-card-cover {
        
    }
    .ant-card-meta-avatar {
        padding-right: 8px;
    }
    .ant-card-meta-title a {
        color: #111;
        font-size: 14px;
    }
`;

export const ThumbItem = styled.div`
    position: relative;
    width: 100%;
    padding-bottom: 100%;

    & > img {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        max-width: 100%;
        max-height: 100%;
        margin: auto;
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