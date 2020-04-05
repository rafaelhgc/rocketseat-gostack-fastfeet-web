import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { MdClose } from 'react-icons/md';

import { toogleModal } from '../../store/modules/modal/actions';

import { Container, Content, Close } from './styles';

export default function Modal({ children }) {
  const dispatch = useDispatch();

  function handleClose() {
    dispatch(toogleModal(false));
  }

  return (
    <Container>
      <Content>
        <Close onClick={handleClose}>
          <MdClose color="#fff" />
        </Close>
        {children}
      </Content>
    </Container>
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
};
