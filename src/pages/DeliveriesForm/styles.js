import styled from 'styled-components';

export const Container = styled.div`
  width: 720px;
  margin: 40px auto;

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

      span {
        color: #fb6f91;
        align-self: flex-start;
        font-weight: bold;
        font-size: 12px;
        margin-top: 10px;
        display: block;
      }
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

    .row {
      display: flex;
      justify-content: start;

      .col {
        padding: 0 10px;
      }

      .col-1 {
        flex: 1;
      }

      .col-2 {
        flex: 2;
      }

      .col-3 {
        flex: 3;
      }
    }
  }
`;

export const Header = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;

  h1 {
    color: #444;
    font-size: 20px;
  }
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
`;

export const Control = styled.button`
  display: flex;
  align-items: center;
  background-color: ${(props) => (props.muted ? '#ddd' : '#7d40e7')};
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  margin-left: 10px;
  padding: 8px 10px;
  border: 0;
  border-radius: 4px;

  span {
    margin-left: 5px;
  }
`;

export const Content = styled.div`
  background-color: #fff;
  padding: 20px;
`;
