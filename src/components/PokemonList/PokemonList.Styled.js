import styled from '@emotion/styled';
import { Card } from '@mui/material';

export const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  padding: 0 20px;

  @media screen and (max-width: 1199px) {
    padding: 8px;
  }
`;

export const GridWrapper = styled.div`
  width: 900px;
  max-width: 1300px;
  margin-right: 50px;

  @media screen and (max-width: 1199px) {
    margin-right: 15px;
  }
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

export const CardStyled = styled(Card)`
  :hover {
    cursor: pointer;
    box-shadow: 1px 3px 3px 2px rgba(33, 33, 33, 0.8);
  }
`;

export const InfoTitle = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: sans-serif;
  font-size: 26px;
  color: #212121;
  letter-spacing: 0.04rem;
`;
