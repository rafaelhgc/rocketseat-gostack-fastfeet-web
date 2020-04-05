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
        padding: 10px 15px;
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

      img {
        width: 38px;
        height: 38px;
        border-radius: 50%;
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
  bottom: -56px;
  right: 12px;
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

export const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  a {
    background-color: #7d40e7;
    display: flex;
    align-items: center;
    color: #fff;
    padding: 10px 15px;
    border-radius: 4px;

    span {
      margin-left: 10px;
      font-weight: bold;
    }
  }
`;

export const Field = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  input {
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 2px;
    padding: 10px;
    width: 220px;
    padding-left: 40px;
  }

  .icon {
    position: absolute;
    width: 40px;
    text-align: center;
  }
`;
