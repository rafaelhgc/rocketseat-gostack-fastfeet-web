import styled from 'styled-components';
import Select from 'react-select/async';

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

export const SelectInput = styled(Select)`
  .react-select__control {
    background-color: #fff;
    border: 2px solid #eee;
    border-radius: 5px;
    height: 44px;
    padding: 0 15px;
    color: #777;
    margin-top: 5px;
    width: 100%;
  }

  .react-select__value-container {
    height: 44px;
    line-height: 44px;
    padding: 0;
  }

  .react-select__single-value {
    top: 66%;
  }

  .react-select__placeholder {
    height: 44px;
    line-height: 44px;
  }

  .react-select__input {
    height: 44px;
    line-height: 44px;
  }
`;
