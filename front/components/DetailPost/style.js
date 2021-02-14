import styled from 'styled-components';
import { Row, Col, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

export const DetailWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
`;

export const CloseBtn = styled(CloseOutlined)`
    position: absolute;
    right: 10px;
    top: 10px;
    padding: 10px;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
`;

export const DetailCard = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% - 100px);
    max-width: 860px;
    min-width: 500px;
    height: 90vh;
    max-height: 500px;
    background-color: #000;

    @media screen and (max-width: 974px) {
        min-width: auto;
        max-width: 460px;
        height: 80vh;
        max-height: 100%;
    }
`;

export const DetailRow = styled(Row)`
    height: 100%;
`;

export const DetailColLeft = styled(Col)`
    position: relative;
    max-width: 500px;
    height: 100%;
    margin: 0 auto;
    background-color: #000;
    @media screen and (max-width: 974px) {
        max-width: 100%;
        height: auto;
    }
`;

export const DetailColRight = styled(Col)`
    overflow-y: hidden;
    height: 100%;
    padding-top: 60px;
    background-color: #fff;

    & > div:last-of-type {
        overflow-y: scroll;
        height: calc(100% - 50px);
        padding-left: 20px;
    }

    & > div:last-of-type > span {
        display: block;
        padding: 20px 0 10px;
    }

    & .ant-comment-content-author-name a {
        color: #111;
        font-size: 14px;
    }

    @media screen and (max-width: 974px) {
        max-width: 100%;
        max-height: 300px;
    }
`;

export const DeleteComment = styled(Button)`
    position: absolute;
    right: 0;
    top: 13px;
    color: #bdbdbd;
    font-size: 14px;

    &:hover {
        background-color: transparent;
    }
`;