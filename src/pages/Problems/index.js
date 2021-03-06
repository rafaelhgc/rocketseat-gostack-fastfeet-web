import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { MdMoreHoriz, MdDelete, MdRemoveRedEye } from 'react-icons/md';
import api from '../../services/api';
import { Container, Header, Menu } from './styles';
import Modal from '../../components/Modal';
import { toogleModal } from '../../store/modules/modal/actions';

export default function Problems() {
  const dispatch = useDispatch();
  const [problems, setProblems] = useState([]);
  const [problem, setProblem] = useState(null);

  const modalVisibility = useSelector((state) => state.modal.visible);

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

  async function handleCancelDelivery(issue) {
    await api.delete(`deliveries/${issue.delivery.id}`);
    handleEnableMenu(issue.id);
    toast.success('Entrega cancelada com sucesso');
  }

  function handleDetails(issue) {
    setProblem(issue.description);
    handleEnableMenu(issue.id);
    dispatch(toogleModal(true));
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
              <th className="center" width="5%">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {problems.map((r) => (
              <tr key={r.id}>
                <td>
                  <span>#</span>
                  <span>{r.id}</span>
                </td>
                <td className="overflow">{r.description}</td>
                <td className="center">
                  <button type="button" onClick={() => handleEnableMenu(r.id)}>
                    <MdMoreHoriz color="#999" size={26} />
                  </button>
                  <Menu enabled={r.enabled}>
                    <button type="button" onClick={() => handleDetails(r)}>
                      <MdRemoveRedEye color="#9b59b6" size={16} />
                      <span>Visualizar</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCancelDelivery(r)}
                    >
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
      {modalVisibility && (
        <Modal>
          <p>{problem}</p>
        </Modal>
      )}
    </Container>
  );
}
