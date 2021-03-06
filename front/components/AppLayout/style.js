import styled from 'styled-components';
import { Col } from 'antd';

export const BodyWrapper = styled.div`
    max-width: 975px;
    margin: 0 auto;
    padding: 60px 10px;
`;

export const ColPadding = styled(Col)`
    padding: 10px;

    @media screen and (min-width: 768px){
        &:first-of-type {
            order: 1;
        }
        &:last-of-type {
            order: 0;
        }
    }
`;
