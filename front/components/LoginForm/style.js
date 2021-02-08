import styled from 'styled-components';
import { Form } from 'antd';

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