import React, { useState, useEffect, useRef } from 'react';
import * as yup from 'yup';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import { MdChevronLeft, MdCheck } from 'react-icons/md';

import api from '../../services/api';
import history from '../../services/history';
import AsyncSelect from '../../components/Select';
import Input from '../../components/Input';
import { Row } from '../../components/Input/Row';

import { Container, Header, Controls, Content, Control } from './styles';

const schema = yup.object().shape({
  product: yup.string().required('O campo produto é obrigatório'),
  recipient_id: yup.string().required('O campo destinatário é obrigatório'),
  deliveryman_id: yup.string().required('O campo entregador é obrigatório'),
});

export default function DeliveriesForm() {
  const formRef = useRef(null);
  const { deliveryId } = useParams();
  const [delivery, setDelivery] = useState(null);
  const [recipients, setRecipients] = useState([]);
  const [deliverymen, setDeliverymen] = useState([]);

  function mapDefaults(arr) {
    return arr.map((i) => ({
      id: i.id,
      value: i.id,
      label: i.name,
    }));
  }

  useEffect(() => {
    async function load() {
      if (deliveryId) {
        const res = await api.get(`deliveries/${deliveryId}`);
        setDelivery(res.data);
        setRecipients(mapDefaults([res.data.recipient]));
        setDeliverymen(mapDefaults([res.data.deliveryman]));
      }
    }

    load();
  }, [deliveryId]);

  function handleBack() {
    history.push('/deliveries');
  }

  async function handleRecipientChange(value, callback) {
    const res = await api.get(`recipients?q=${value}`);
    callback(res.data.map((i) => ({ value: i.id, label: i.name })));
  }

  async function handleDeliverymanChange(value, callback) {
    const res = await api.get(`deliverymen?q=${value}`);
    callback(res.data.map((i) => ({ value: i.id, label: i.name })));
  }

  async function handleSubmit(data) {
    try {
      await schema.validate(data, { abortEarly: false });

      if (deliveryId) {
        await api.put(`/deliveries/${deliveryId}`, data);
      } else {
        await api.post('/deliveries', data);
      }

      history.push('/deliveries');
    } catch (err) {
      const validationErrors = {};

      if (err instanceof yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      } else {
        toast.error(
          `Erro ao ${
            deliveryId ? 'atualizar' : 'cadastrar'
          } entrega. Verifique os dados`
        );
      }
    }
  }

  return (
    <Container>
      <Form initialData={delivery} onSubmit={handleSubmit} ref={formRef}>
        <Header>
          <h1>
            <span>{deliveryId ? 'Edição ' : 'Cadastro '}</span>
            de entregas
          </h1>

          <Controls>
            <Control type="button" muted onClick={handleBack}>
              <MdChevronLeft color="#fff" size={18} />
              <span>Voltar</span>
            </Control>
            <Control type="submit">
              <MdCheck color="#fff" size={18} />
              <span>Salvar</span>
            </Control>
          </Controls>
        </Header>

        <Content>
          <Row>
            <AsyncSelect
              placeholder="Selecione um destinatário"
              label="Destinatário"
              cacheOptions
              name="recipient_id"
              loadOptions={handleRecipientChange}
              defaultOptions={recipients}
              value={recipients[0]}
            />

            <AsyncSelect
              placeholder="Selecione um entregador"
              label="Entregador"
              cacheOptions
              name="deliveryman_id"
              loadOptions={handleDeliverymanChange}
              defaultOptions={deliverymen}
              value={deliverymen[0]}
            />
          </Row>

          <Row>
            <Input
              label="Produto"
              name="product"
              type="text"
              placeholder="Descrição do produto"
            />
          </Row>
        </Content>
      </Form>
    </Container>
  );
}
