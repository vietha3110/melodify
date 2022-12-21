import React, { useState } from 'react';
import { Modal } from '../../Modal';
import LoginForm from './LoginForm';

export default function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm onClose={() => setShowModal(false)}/>
        </Modal>
      )}
    </>
  );
}
