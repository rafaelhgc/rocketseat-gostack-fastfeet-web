import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { signOut } from '../../store/modules/auth/actions';
import logo from '../../assets/img/logo.png';

import { Container, Content } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.auth.name);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Fastfeet" />
          <NavLink to="/deliveries" activeStyle={{ color: '#444' }}>
            ENCOMENDAS
          </NavLink>
          <NavLink to="/deliverymen" activeStyle={{ color: '#444' }}>
            ENTREGADORES
          </NavLink>
          <NavLink to="/recipients" activeStyle={{ color: '#444' }}>
            DESTINATÁRIOS
          </NavLink>
          <NavLink to="/problems" activeStyle={{ color: '#444' }}>
            PROBLEMAS
          </NavLink>
        </nav>

        <aside>
          <div>
            <strong>{name}</strong>
            <button type="button" onClick={handleSignOut}>
              sair do sistema
            </button>
          </div>
        </aside>
      </Content>
    </Container>
  );
}
