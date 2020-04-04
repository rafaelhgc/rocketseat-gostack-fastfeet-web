import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
  MdMoreHoriz,
  MdRemoveRedEye,
  MdEdit,
  MdDelete,
  MdAdd,
  MdSearch,
} from 'react-icons/md';

import api from '../../services/api';

import { Container, Header, Status, Menu, Controls, Field } from './styles';

export default function Deliveries() {
  const [product, setProduct] = useState('');
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await api.get('deliveries', { params: { q: product } });
      const data = res.data.map((i) => ({ ...i, enabled: false }));
      setDeliveries(data);
    }

    load();
  }, [product]);

  function handleEnableMenu(id) {
    const data = deliveries.map((i) => ({
      ...i,
      enabled: i.enabled ? false : id === i.id,
    }));
    setDeliveries(data);
  }

  return (
    <Container>
      <Header>
        <h1>Gerenciando Encomendas</h1>

        <Controls>
          <Field>
            <div className="icon">
              <MdSearch color="#eee" size={20} />
            </div>
            <input
              type="text"
              placeholder="Buscar por encomendas"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />
          </Field>
          <Link to="/">
            <MdAdd color="#fff" size={20} />
            <span>Cadastrar</span>
          </Link>
        </Controls>
      </Header>
      {deliveries.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Destinatário</th>
              <th>Entregador</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Status</th>
              <th className="center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((d) => (
              <tr key={d.id}>
                <td>
                  <span>#</span>
                  <span>{d.id}</span>
                </td>
                <td>{d.recipient.name}</td>
                <td>{d.deliveryman.name}</td>
                <td>{d.recipient.city}</td>
                <td>{d.recipient.state}</td>
                <td>
                  <Status status={d.status}>{d.status}</Status>
                </td>
                <td className="center">
                  <button type="button" onClick={() => handleEnableMenu(d.id)}>
                    <MdMoreHoriz color="#999" size={26} />
                  </button>
                  <Menu enabled={d.enabled}>
                    <button type="button">
                      <MdRemoveRedEye color="#9b59b6" size={16} />
                      <span>Visualizar</span>
                    </button>

                    <button type="button">
                      <MdEdit color="#3498db" size={16} />
                      <span>Editar</span>
                    </button>

                    <button type="button">
                      <MdDelete color="#e74c3c" size={16} />
                      <span>Cancelar</span>
                    </button>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Container>
  );
}
