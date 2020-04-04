import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { MdMoreHoriz, MdEdit, MdDelete, MdAdd, MdSearch } from 'react-icons/md';

import api from '../../services/api';

import { Container, Header, Menu, Controls, Field } from './styles';

export default function Deliverymen() {
  const [name, setName] = useState('');
  const [deliverymen, setDeliverymen] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await api.get('deliverymen', { params: { q: name } });
      const data = res.data.map((i) => ({ ...i, enabled: false }));
      setDeliverymen(data);
    }

    load();
  }, [name]);

  function handleEnableMenu(id) {
    const data = deliverymen.map((i) => ({
      ...i,
      enabled: i.enabled ? false : id === i.id,
    }));
    setDeliverymen(data);
  }

  return (
    <Container>
      <Header>
        <h1>Gerenciando Entregadores</h1>

        <Controls>
          <Field>
            <div className="icon">
              <MdSearch color="#eee" size={20} />
            </div>
            <input
              type="text"
              placeholder="Buscar por entregadores"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field>
          <Link to="/">
            <MdAdd color="#fff" size={20} />
            <span>Cadastrar</span>
          </Link>
        </Controls>
      </Header>
      {deliverymen.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Foto</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th className="center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {deliverymen.map((d) => (
              <tr key={d.id}>
                <td>
                  <span>#</span>
                  <span>{d.id}</span>
                </td>
                <td />
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td className="center">
                  <button type="button" onClick={() => handleEnableMenu(d.id)}>
                    <MdMoreHoriz color="#999" size={26} />
                  </button>
                  <Menu enabled={d.enabled}>
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
