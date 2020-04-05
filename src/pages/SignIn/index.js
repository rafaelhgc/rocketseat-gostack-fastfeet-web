import React from 'react';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@unform/web';
import Input from '../../components/Input';
import { Row } from '../../components/Input/Row';
import { signInRequest } from '../../store/modules/auth/actions';
import logo from '../../assets/img/logo.png';

const schema = yup.object().shape({
  email: yup.string().required('O campo e-mail é obrigatório'),
  password: yup.string().required('O campo senha é obrigatório'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  async function onSubmit({ email, password }) {
    try {
      await schema.validate({ email, password }, { abortEarly: false });
      dispatch(signInRequest(email, password));
    } catch (e) {
      if (e.inner) {
        const errors = e.inner.map((error) => error.message);
        alert(errors.join('\n\r'));
      }
    }
  }

  return (
    <>
      <div className="brand">
        <img src={logo} alt="Fastfeet" />
      </div>
      <Form onSubmit={onSubmit}>
        <Row>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="E-mail"
            label="Seu E-mail"
          />
        </Row>
        <Row>
          <Input
            id="senha"
            name="password"
            type="password"
            placeholder="Senha"
            label="Sua Senha"
          />
        </Row>
        <Row>
          <button type="submit">
            {loading ? 'Carregando...' : 'Entrar no sistema'}
          </button>
        </Row>
      </Form>
    </>
  );
}
