import React, { useState, useEffect } from 'react';

import { MdMoreHoriz, MdDelete, MdRemoveRedEye } from 'react-icons/md';

import api from '../../services/api';

import { Container, Header, Menu } from './styles';

export default function Problems() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await api.get('problems');
      const data = res.data.map((i) => ({
        ...i,
        enabled: false,
      }));
      setProblems(data);
    }

    load();
  }, []);

  function handleEnableMenu(id) {
    const data = problems.map((i) => ({
      ...i,
      enabled: i.enabled ? false : id === i.id,
    }));
    setProblems(data);
  }

  return (
    <Container>
      <Header>
        <h1>Problemas na entrega</h1>
      </Header>
      {problems.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Problema</th>
              <th className="center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((r) => (
              <tr key={r.id}>
                <td>
                  <span>#</span>
                  <span>{r.id}</span>
                </td>
                <td>{r.description}</td>
                <td className="center">
                  <button type="button" onClick={() => handleEnableMenu(r.id)}>
                    <MdMoreHoriz color="#999" size={26} />
                  </button>
                  <Menu enabled={r.enabled}>
                    <button type="button">
                      <MdRemoveRedEye color="#9b59b6" size={16} />
                      <span>Visualizar</span>
                    </button>

                    <button type="button">
                      <MdDelete color="#e74c3c" size={16} />
                      <span>Cancelar entrega</span>
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
