import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background-color: #7d40e7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 90%;
  max-width: 380px;
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;

  button {
    background-color: #7d40e7;
    color: #fff;
    width: 100%;
    padding: 14px;
    font-weight: bold;
    font-size: 15px;
    border: 0;
    border-radius: 4px;
    transition: background-color 0.3s;

    &:hover {
      background-color: ${darken(0.1, '#7d40e7')};
    }
  }

  .brand {
    text-align: center;
    margin: 40px 0;
  }
`;
