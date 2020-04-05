import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';
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
import history from '../../services/history';
import Modal from '../../components/Modal';
import { toogleModal } from '../../store/modules/modal/actions';

import {
  Container,
  Header,
  Status,
  Menu,
  Controls,
  Field,
  Details,
} from './styles';

export default function Deliveries() {
  const dispatch = useDispatch();
  const [product, setProduct] = useState('');
  const [deliveries, setDeliveries] = useState([]);
  const [delivery, setDelivery] = useState(null);

  const modalVisibility = useSelector((state) => state.modal.visible);

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

  async function handleDetails(id) {
    const res = await api.get(`/deliveries/${id}`);
    setDelivery(res.data);
    handleEnableMenu(id);
    dispatch(toogleModal(true));
  }

  async function handleEdit(id) {
    history.push(`/deliveries/${id}`);
  }

  async function handleCancel(id) {
    await api.delete(`deliveries/${id}`);
    handleEnableMenu(id);
    toast.success('Entrega cancelada com sucesso');
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
          <Link to="/deliveries/new">
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
              <th className="center" width="5%">
                Ações
              </th>
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
                    <button type="button" onClick={() => handleDetails(d.id)}>
                      <MdRemoveRedEye color="#9b59b6" size={16} />
                      <span>Visualizar</span>
                    </button>
                    <button type="button" onClick={() => handleEdit(d.id)}>
                      <MdEdit color="#3498db" size={16} />
                      <span>Editar</span>
                    </button>
                    <button type="button" onClick={() => handleCancel(d.id)}>
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
      {modalVisibility && (
        <Modal>
          <Details>
            <h4>Informações da encomenda</h4>
            <p>
              {`${delivery.recipient.street_address}, ${delivery.recipient.number}`}
            </p>
            <p>{`${delivery.recipient.city} - ${delivery.recipient.state}`}</p>
            <p>{`${delivery.recipient.zip_code}`}</p>
            <hr />
            <h4>Datas</h4>
            <p>
              <strong>Retirada </strong>
              {delivery.start_date
                ? format(parseISO(delivery.start_date), "dd'/'MM'/'yyyy", {
                    locale: pt,
                  })
                : '-'}
            </p>
            <p>
              <strong>Entrega </strong>
              {delivery.end_date
                ? format(parseISO(delivery.end_date), "dd'/'MM'/'yyyy", {
                    locale: pt,
                  })
                : '-'}
            </p>
            <hr />
            {delivery.signature && (
              <div>
                <h4>Assinatura do Destinatário</h4>
                <div className="signature">
                  <img src={delivery.signature.url} alt="signature" />
                </div>
              </div>
            )}
          </Details>
        </Modal>
      )}
    </Container>
  );
}
