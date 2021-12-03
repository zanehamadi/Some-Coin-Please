import { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import Button from '@mui/material/Button';



function LoginFormModal() {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <Button variant="outlined" onClick={() => setShowModal(true)}>Sign In</Button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm/>
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;