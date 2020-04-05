import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdChevronLeft, MdCheck } from 'react-icons/md';
import { Form } from '@unform/web';
import Input from '../../components/Input';
import { Row } from '../../components/Input/Row';

import api from '../../services/api';
import history from '../../services/history';

import { Container, Header, Controls, Content, Control } from './styles';
import AvatarInput from './AvatarInput';

const schema = yup.object().shape({
  avatar_id: yup.number(),
  name: yup.string().required('O campo nome é obrigatório'),
  email: yup
    .string()
    .email('Informe um e-mail válido')
    .required('O campo e-mail é obrigatório'),
});

export default function DeliverymenForm() {
  const { deliverymanId } = useParams();
  const [deliveryman, setDeliveryman] = useState(null);

  useEffect(() => {
    async function load() {
      if (deliverymanId) {
        const res = await api.get(`/deliverymen/${deliverymanId}`);
        setDeliveryman(res.data);
      }
    }

    load();
  }, [deliverymanId]);

  function handleBack() {
    history.push('/deliverymen');
  }

  async function handleSubmit(data) {
    try {
      await schema.validate(data, { abortEarly: false });

      if (deliverymanId) {
        await api.put(`/deliverymen/${deliverymanId}`, data);
      } else {
        await api.post('/deliverymen', data);
      }

      history.push('/deliverymen');
    } catch (e) {
      if (e.inner) {
        const errors = e.inner.map((error) => error.message);
        alert(errors.join('\n\r'));
      } else {
        toast.error(
          `Erro ao ${
            deliverymanId ? 'atualizar' : 'cadastrar'
          } entregador. Verifique os dados`
        );
      }
    }
  }

  return (
    <Container>
      <Form initialData={deliveryman} onSubmit={handleSubmit} schema={schema}>
        <Header>
          <h1>
            <span>{deliverymanId ? 'Edição ' : 'Cadastro '}</span>
            de Entregadores
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
          <AvatarInput name="avatar_id" />
          <Row>
            <Input name="name" placeholder="Nome completo" label="Nome" />
          </Row>
          <Row>
            <Input
              name="email"
              type="email"
              placeholder="Endereço de e-mail"
              label="E-mail"
            />
          </Row>
        </Content>
      </Form>
    </Container>
  );
}
