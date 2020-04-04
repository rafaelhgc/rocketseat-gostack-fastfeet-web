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
  width: 100%;
  max-width: 320px;
  background-color: #fff;
  border-radius: 5px;
  padding: 50px 20px;
  text-align: center;

  img {
    margin-bottom: 20px;
    width: 75%;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    justify-content: start;
    text-align: left;

    label {
      display: block;
      font-size: 14px;
      font-weight: bold;
      text-transform: uppercase;
      color: #444;
      margin-bottom: 20px;
    }

    input {
      background-color: #fff;
      border: 2px solid #eee;
      border-radius: 5px;
      height: 44px;
      padding: 0 15px;
      color: #777;
      margin-top: 5px;
      width: 100%;

      &::placeholder {
        color: #999;
      }
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      font-weight: bold;
      font-size: 12px;
      margin-top: 10px;
      display: block;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background-color: #7d40e7;
      color: white;
      font-weight: bold;
      border: 0;
      border-radius: 5px;
      font-size: 14px;
      transition: background-color 0.3s;

      &:hover {
        background-color: ${darken(0.03, '#7d40e7')};
      }
    }

    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.75;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
