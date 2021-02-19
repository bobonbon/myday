import styled from 'styled-components';
import { Button } from 'antd';

export const FormTitle = styled.p`
    margin-bottom: 0;
    padding: 5px 0;
    text-indent: 10px;
    border-top: 1px solid #dbdbdb;
    border-bottom: 1px solid #dbdbdb;
`
export const PostFormCol = styled.div`
    float: left;
    min-width: 50%;
`;

export const AddImagesButton = styled(Button)`
    position: relative;
    width: 100%;
    padding-bottom: 80%;
    font-size: 24px;
    background-color: #f7f7f7;

    &:hover {
        background-color: #f0f0f0;
    }

    & > span {
        position: absolute;
        top: 0; 
        right: 0; 
        bottom: 0; 
        left: 0;
        width: 10%;
        height: 10%; 
        margin: auto;
    }
`;