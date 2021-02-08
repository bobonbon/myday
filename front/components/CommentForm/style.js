import styled from 'styled-components';
import { Input } from 'antd';

export const InputComment = styled(Input.Search)`

    button {
        color: #0095f6;
        border: none;
        background-color: #fff;
        box-shadow: none;
    }

    button:hover,
    button:active,
    button:focus {
        color: #40a9ff;
        border: none;
        background-color: #fff;
    }
`;