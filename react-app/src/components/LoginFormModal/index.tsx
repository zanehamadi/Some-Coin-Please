import { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import Button from '@mui/material/Button';




function LoginFormModal() {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Log In</Button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm/>
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;