import styled from 'styled-components';
import Select from 'react-select/async';

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

  .error {
    display: block;
    margin-top: 5px;
    font-weight: bold;
    color: #ff5252;
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

  .react-select__placeholder {
    height: 44px;
    line-height: 44px;
  }

  .react-select__input {
    height: 44px;
    line-height: 44px;
  }
`;
