import styled from 'styled-components';

export const Container = styled.div`
  width: 720px;
  margin: 40px auto;
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
