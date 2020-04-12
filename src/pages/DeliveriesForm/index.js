import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import { MdChevronLeft, MdCheck } from 'react-icons/md';
import api from '../../services/api';
import history from '../../services/history';
import AsyncSelect from './Select';
import Input from '../../components/Input';
import { Container, Header, Controls, Content, Control } from './styles';

const schema = yup.object().shape({
  product: yup.string().required('O campo produto é obrigatório'),
  recipient_id: yup.string().required('O campo destinatário é obrigatório'),
  deliveryman_id: yup.string().required('O campo entregador é obrigatório'),
});

export default function DeliveriesForm() {
  const { deliveryId } = useParams();
  const [delivery, setDelivery] = useState(null);
  const [deliveryman, setDeliveryman] = useState();
  const [recipient, setRecipient] = useState();

  useEffect(() => {
    async function load() {
      if (deliveryId) {
        const res = await api.get(`deliveries/${deliveryId}`);
        setDelivery(res.data);
        setDeliveryman({
          value: res.data.deliveryman.id,
          label: res.data.deliveryman.name,
        });
        setRecipient({
          value: res.data.recipient.id,
          label: res.data.recipient.name,
        });
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
    } catch (e) {
      if (e.inner) {
        const errors = e.inner.map((error) => error.message);
        alert(errors.join('\n\r'));
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
      <Form initialData={delivery} onSubmit={handleSubmit} schema={schema}>
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
          <div className="row">
            <label className="col col-1">
              Destinatário
              <AsyncSelect
                name="recipient_id"
                defaultValue={recipient ? recipient.value : ''}
                defaultOptions={[recipient]}
                loadOptions={handleRecipientChange}
              />
            </label>

            <label className="col col-1">
              Entregador
              <AsyncSelect
                name="deliveryman_id"
                defaultValue={deliveryman ? deliveryman.value : ''}
                defaultOptions={[deliveryman]}
                loadOptions={handleDeliverymanChange}
              />
            </label>
          </div>

          <div className="row">
            <label className="col col-1">
              Produto
              <Input
                name="product"
                type="text"
                placeholder="Descrição do produto"
              />
            </label>
          </div>
        </Content>
      </Form>
    </Container>
  );
}