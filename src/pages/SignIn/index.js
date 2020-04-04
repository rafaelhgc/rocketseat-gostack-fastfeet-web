import React from 'react';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import logo from '../../assets/img/logo.png';
import { signInRequest } from '../../store/modules/auth/actions';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Informe uma e-mail válido')
    .required('O e-mail é obrigatório'),
  password: yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  function onSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="Fastfeet" />

      <Form onSubmit={onSubmit} schema={schema}>
        <label htmlFor="email">
          Seu e-mail
          <Input id="email" name="email" type="email" placeholder="E-mail" />
        </label>
        <label htmlFor="senha">
          Sua senha
          <Input
            id="senha"
            name="password"
            type="password"
            placeholder="Senha"
          />
        </label>

        <button type="submit">
          {loading ? 'Carregando...' : 'Entrar no Sistema'}
        </button>
      </Form>
    </>
  );
}
