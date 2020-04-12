import styled from 'styled-components';

export const Field = styled.div`
  margin-bottom: 20px;
  width: 100%;
  flex: ${(props) => props.cols};
  padding: 0 5px;

  label {
    font-weight: bold;
    text-transform: uppercase;
    color: #444;
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

  .error {
    display: block;
    margin-top: 5px;
    font-weight: bold;
    color: #ff5252;
  }
`;
