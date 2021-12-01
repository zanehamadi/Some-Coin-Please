import { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';
import Button from '@mui/material/Button';
import {outlinedButton} from '../styling-variables'



function SignupFormModal() {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <Button variant="outlined" style={outlinedButton} onClick={() => setShowModal(true)}>Sign Up</Button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm/>
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;