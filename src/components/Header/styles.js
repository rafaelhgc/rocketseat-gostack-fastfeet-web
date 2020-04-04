import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
  border-bottom: 1px solid #eee;
`;

export const Content = styled.div`
  height: 56px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
      height: 24px;
    }

    a {
      font-weight: bold;
      color: #999;
      margin-right: 20px;
    }
  }

  aside {
    display: flex;

    div {
      display: flex;
      justify-content: start;
      flex-direction: column;
      margin-left: 20px;
      padding-left: 20px;
      border-left: 1px solid #eee;
    }

    button {
      background-color: transparent;
      border: 0;
      text-align: left;
      margin-top: 5px;
      font-weight: bold;
      color: #eb4d4b;
    }
  }
`;
