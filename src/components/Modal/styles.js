import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-content: center;
  align-items: center;
  align-self: center;
  justify-content: center;
`;

export const Content = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  width: 520px;
  margin: 0 auto;
  position: relative;
`;

export const Close = styled.button`
  width: 42px;
  height: 42px;
  background-color: #565656;
  position: absolute;
  top: -15px;
  right: -15px;
  border: 5px solid #fff;
  border-radius: 50%;
`;
