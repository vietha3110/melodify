import React, { useState } from 'react';
import { Modal } from '../../Modal';
import SignUpForm from './SignUpForm';

export default function SignUpFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>SignUp</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignUpForm onClose={() => setShowModal(false)}/>
        </Modal>
      )}
    </>
  );
}
