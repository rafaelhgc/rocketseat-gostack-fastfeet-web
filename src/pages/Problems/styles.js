import styled from 'styled-components';

export const Container = styled.div`
  width: 1024px;
  margin: 40px auto;

  table {
    width: 100%;
    border-spacing: 0 15px;
    text-align: left;

    thead {
      font-weight: bold;
      color: #444;

      th {
        padding: 0 15px;
      }

      th.center {
        text-align: center;
      }
    }

    tbody {
      color: #666;

      tr {
        margin-bottom: 10px;
        background-color: #fff;
      }

      td {
        padding: 15px;
        position: relative;
      }

      td.center {
        text-align: center;

        > button {
          width: 24px;
          height: 24px;
          background-color: transparent;
          border: 0;
        }
      }
    }
  }
`;

export const Header = styled.header`
  h1 {
    color: #444;
    font-size: 20px;
    margin-bottom: 20px;
  }
`;

export const Menu = styled.div`
  position: absolute;
  bottom: -105px;
  right: 0px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 2px;
  z-index: 9999;
  display: flex;
  justify-content: start;
  flex-direction: column;
  display: ${(props) => (props.enabled ? 'block' : 'none')};

  button {
    background-color: transparent;
    border: 0;
    margin: 0 7px;
    display: flex;
    padding: 10px;
    border-bottom: 1px solid #eee;
    width: 100px;

    :last-child {
      border-bottom: 0;
    }

    span {
      margin-left: 10px;
      font-size: 12px;
      color: #999;
    }
  }
`;
