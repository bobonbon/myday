import { createGlobalStyle } from 'styled-components'
import styled from 'styled-components';
import { Form, Card } from 'antd';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
    }

    body {
        box-sizing: border-box;
    }

    .wrapper {
        max-width: 975px;
        margin: 0 auto;
        padding: 0 20px;
    }

    @media screen and (max-width: 700px) {
        .wrapper {
            padding: 0;
        }
    }
`

export const FormPadding = styled(Form)`
    padding: 10px 20px;
`;

export const FormGutter = styled.div`
    margin-top: 10px;

    & a {
        margin-left: 10px;
    }

    & label {
        color: #b3b3b3;
    }
`;

export const CardWrapper = styled(Card)`
    position: relative;
    margin: 20px 0;
    padding: 0;
    padding-top: 60px;
    padding-bottom: 50px;
`;

export const CardTop = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #f3f3f3;

    & > div {
        position: absolute; 
        left: 20px; 
        top: 50%; 
        transform: translateY(-50%);
        padding-top: 5px;
    }

    & > button {
        position: absolute;
        right: 10px;
        top: 50%; 
        transform: translateY(-50%);
    }
`;

export const StyleCommentForm = styled(Form)`
    position: absolute; 
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    border-top: 1px solid #f3f3f3;
`;


export default GlobalStyle;