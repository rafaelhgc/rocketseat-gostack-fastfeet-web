import styled from 'styled-components';
import { lighten } from 'polished';

function statusColor(status) {
  switch (status) {
    case 'CANCELADA':
      return '#de3b3b';
    case 'ENTREGUE':
      return '#2CA42B';
    case 'RETIRADA':
      return '#4D85EE';
    case 'PENDENTE':
      return '#C1BC35';
    default:
      return '#fff';
  }
}

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

export const Status = styled.div`
  position: relative;
  font-weight: bold;
  font-size: 12px;
  background-color: ${(props) => lighten(0.35, statusColor(props.status))};
  color: ${(props) => statusColor(props.status)};
  padding: 5px 10px 5px 20px;
  border-radius: 15px;
  display: inline-block;
  width: auto;

  &::before {
    content: '';
    position: absolute;
    border-radius: 50%;
    width: 8px;
    height: 8px;
    background-color: ${(props) => statusColor(props.status)};
    top: 8px;
    left: 8px;
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

export const Details = styled.div`
  padding: 20px;

  h4 {
    margin-bottom: 10px;
    color: #444;
  }

  p {
    margin-bottom: 5px;
    color: #777;

    strong {
      color: #444;
    }
  }

  hr {
    height: 1px;
    border: 0;
    margin: 10px 0;
    background-color: rgba(0, 0, 0, 0.1);
  }

  .signature {
    text-align: center;

    img {
      max-width: 100%;
      max-height: 100px;
    }
  }
`;
