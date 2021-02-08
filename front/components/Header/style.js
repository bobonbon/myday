import styled from 'styled-components';
import { Menu } from 'antd';
import { InstagramOutlined } from '@ant-design/icons';

export const GnbWrapper = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%; 
    height: auto;
    padding: 0 10px;
    background-color: #fff;
    border-bottom: 1px solid #dbdbdb;
    z-index: 10;
`;

export const InstaLogo = styled(InstagramOutlined)`
    color: #000;
    font-size: 30px;
`;

export const HeaderItem = styled.li`
    display: inline-block;
    padding: 10px 0;
    border: none;

    &.gnb-search {
        width: 100%;

        .ant-input-search-button {
            position: absolute;
            right: 0;
            top: 0;
            background: #ccc;
            border: none;
        }
    }
    
    &.user-menu {
        float: right;
    }
`;

export const HeaderUserItem = styled(Menu)`
    float: right;
`;