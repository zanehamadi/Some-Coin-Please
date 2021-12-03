import { useState } from 'react';
import { Modal } from '../../context/Modal';
import Button from '@mui/material/Button';
import {outlinedButton} from '../styling-variables'
import {deleteAProduct, loadProducts} from '../../store/products'
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';


interface DeleteModalProps{
  product: any;
}

function DeleteModal({product}: DeleteModalProps){
  const [showModal, setShowModal] = useState<boolean>(false);
  const [confirmationText, setConfirmationText]  = useState<string>('');
  const dispatch = useDispatch()
  const navigate = useNavigate()


  let confirmationSentence = `delete ${product.title}`

  const deleteProductHandler = async () => {
    const productId = product?.id
    await dispatch(deleteAProduct(+productId))
    await dispatch(loadProducts())
    navigate('/')

  }

  return(
    <>
      <Button variant="outlined" style={outlinedButton} onClick={() => setShowModal(true)}>Delete Product</Button>
      {showModal && 
        <Modal onClose={() => setShowModal(false)}>
        <>
          <h1>Are you sure about this? 😲</h1>
          <p>This action is irreversible. You will not be able to undo this, nor will you be able to access this information again.</p>
          <span>{`If you are 100% certain, type "${confirmationSentence}" `}</span>
          <TextField label="Confirmation" variant="filled" value={confirmationText} onChange={e => setConfirmationText(e.target.value)} />
          <Button disabled={!(confirmationSentence === confirmationText)} onClick={deleteProductHandler}>Confirm</Button>
        </>
        </Modal>  
      }
    </>


  )
}

export default DeleteModal