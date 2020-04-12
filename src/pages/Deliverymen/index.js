import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdMoreHoriz, MdEdit, MdDelete, MdAdd, MdSearch } from 'react-icons/md';

import api from '../../services/api';
import history from '../../services/history';

import { Container, Header, Menu, Controls, Field } from './styles';

export default function DeliverymenForm() {
  const [name, setName] = useState('');
  const [deliverymen, setDeliverymen] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await api.get('deliverymen', { params: { q: name } });
      setDeliverymen(res.data.map((i) => ({ ...i, enabled: false })));
    }

    load();
  }, [name]);

  function handleEnableMenu(id) {
    setDeliverymen(
      deliverymen.map((i) => ({
        ...i,
        enabled: i.enabled ? false : id === i.id,
      }))
    );
  }

  function handleEdit(id) {
    history.push(`/deliverymen/${id}`);
  }

  async function handleRemove(id) {
    await api.delete(`/deliverymen/${id}`);
    setDeliverymen(deliverymen.filter((d) => d.id !== id));
    toast.success('Entregador removido com sucesso');
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
          <Link to="/deliverymen/new">
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
              <th className="center" width="5%">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {deliverymen.map((d) => (
              <tr key={d.id}>
                <td>
                  <span>#</span>
                  <span>{d.id}</span>
                </td>
                <td>
                  <img
                    src={
                      d.avatar
                        ? d.avatar.url
                        : `https://api.adorable.io/avatars/50/${d.id}.png`
                    }
                    alt={d.name}
                  />
                </td>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td className="center">
                  <button type="button" onClick={() => handleEnableMenu(d.id)}>
                    <MdMoreHoriz color="#999" size={26} />
                  </button>
                  <Menu enabled={d.enabled}>
                    <button type="button" onClick={() => handleEdit(d.id)}>
                      <MdEdit color="#3498db" size={16} />
                      <span>Editar</span>
                    </button>

                    <button type="button" onClick={() => handleRemove(d.id)}>
                      <MdDelete color="#e74c3c" size={16} />
                      <span>Remover</span>
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
