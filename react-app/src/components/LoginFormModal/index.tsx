import { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';



function LoginFormModal() {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm/>
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;