import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { MdMoreHoriz, MdEdit, MdDelete, MdAdd, MdSearch } from 'react-icons/md';

import api from '../../services/api';

import { Container, Header, Menu, Controls, Field } from './styles';

export default function Recipients() {
  const [name, setName] = useState('');
  const [recipients, setrecipients] = useState([]);

  function concatAddress(r) {
    return `${r.street_address}, ${r.number}, ${r.city} - ${r.state}`;
  }

  useEffect(() => {
    async function load() {
      const res = await api.get('recipients');
      const data = res.data.map((i) => ({
        ...i,
        enabled: false,
        address: concatAddress(i),
      }));
      setrecipients(data);
    }

    load();
  }, [name]);

  function handleEnableMenu(id) {
    const data = recipients.map((i) => ({
      ...i,
      enabled: i.enabled ? false : id === i.id,
      address: concatAddress(i),
    }));
    setrecipients(data);
  }

  return (
    <Container>
      <Header>
        <h1>Gerenciando Destinatários</h1>

        <Controls>
          <Field>
            <div className="icon">
              <MdSearch color="#eee" size={20} />
            </div>
            <input
              type="text"
              placeholder="Buscar por destinatários"
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
      {recipients.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Endereço</th>
              <th className="center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {recipients.map((r) => (
              <tr key={r.id}>
                <td>
                  <span>#</span>
                  <span>{r.id}</span>
                </td>
                <td>{r.name}</td>
                <td>{r.address}</td>
                <td className="center">
                  <button type="button" onClick={() => handleEnableMenu(r.id)}>
                    <MdMoreHoriz color="#999" size={26} />
                  </button>
                  <Menu enabled={r.enabled}>
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
