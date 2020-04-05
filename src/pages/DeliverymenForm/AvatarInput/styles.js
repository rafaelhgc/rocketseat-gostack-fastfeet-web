import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  margin-bottom: 30px;
  justify-content: center;
  text-align: center;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.3;
    }

    img {
      height: 120px;
      width: 120px;
      border-radius: 50%;
      border: 3px solid rgba(255, 255, 255, 0.3);
      background-color: #eee;
    }

    input {
      display: none;
    }
  }
`;
