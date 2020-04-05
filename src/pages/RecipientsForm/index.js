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

const schema = yup.object().shape({
  name: yup.string().required('O campo Nome é obrigatório'),
  street_address: yup.string().required('O campo Rua é obrigatório'),
  number: yup.string().required('O campo Número é obrigatório'),
  state: yup.string().required('O campo Estado é obrigatório'),
  city: yup.string().required('O campo Cidade é obrigatório'),
  zip_code: yup.string().required('O campo CEP é obrigatório'),
  complement: yup.string(),
});

export default function RecipientsForm() {
  const { recipientId } = useParams();
  const [deliveryman, setDeliveryman] = useState(null);

  useEffect(() => {
    async function load() {
      if (recipientId) {
        const res = await api.get(`/recipients/${recipientId}`);
        setDeliveryman(res.data);
      }
    }

    load();
  }, [recipientId]);

  function handleBack() {
    history.push('/recipients');
  }

  async function handleSubmit(data) {
    try {
      await schema.validate(data, { abortEarly: false });

      if (recipientId) {
        await api.put(`/recipients/${recipientId}`, data);
      } else {
        await api.post('/recipients', data);
      }

      history.push('/recipients');
    } catch (e) {
      if (e.inner) {
        const errors = e.inner.map((error) => error.message);
        alert(errors.join('\n\r'));
      } else {
        toast.error(
          `Erro ao ${
            recipientId ? 'atualizar' : 'cadastrar'
          } destinatário. Verifique os dados`
        );
      }
    }
  }

  return (
    <Container>
      <Form initialData={deliveryman} onSubmit={handleSubmit} schema={schema}>
        <Header>
          <h1>
            <span>{recipientId ? 'Edição ' : 'Cadastro '}</span>
            de destinatários
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
            <Input
              name="name"
              type="text"
              placeholder="Nome completo"
              label="Nome"
            />
          </Row>

          <Row>
            <Input
              name="street_address"
              type="text"
              placeholder="Rua"
              label="Rua"
              cols="3"
            />

            <Input
              name="number"
              type="text"
              placeholder="Número"
              label="Número"
              cols="2"
            />

            <Input
              name="complement"
              type="text"
              placeholder="Complemento"
              label="Complemento"
              cols="1"
            />
          </Row>

          <Row>
            <Input
              name="city"
              type="text"
              placeholder="Cidade"
              label="Cidade"
            />
            <Input
              name="state"
              type="text"
              placeholder="Estado"
              label="Estado"
            />
            <Input name="zip_code" type="text" placeholder="CEP" label="CEP" />
          </Row>
        </Content>
      </Form>
    </Container>
  );
}
