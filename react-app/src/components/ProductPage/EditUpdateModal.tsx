import { useState } from 'react';
import { Modal } from '../../context/Modal';
import Button from '@mui/material/Button';
import {editUpdate, loadUpdates} from '../../store/updates'
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';

interface EditUpdateModalProps{
  update: any;
}

function EditUpdateModal({update}: EditUpdateModalProps){
  const [showModal, setShowModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(update.title);
  const [description, setDescription] = useState<string>(update.description);
  const [editSuccessful, setEditSucessful] = useState<boolean>(false)
  const [openSnack, setOpenSnack] = useState<boolean>(false)

  const dispatch = useDispatch()

  const editUpdateHandler = async () => {
    const updateValidators = []
    if(title.length > 256 ) updateValidators.push('Title can not be longer than 256 characters.')
    if(title.length < 1 ) updateValidators.push('You must provide a title.')
    if(description.length < 15) updateValidators.push('Description must be longer than 15 characters.')
    if(description.length > 2000) updateValidators.push('Description can not be longer than 2000 characters.')

    if(!updateValidators.length){
      const editedUpdate = await dispatch(editUpdate({
        id: update.id,
        title,
        description
      }))
      await dispatch(loadUpdates())
      if(editedUpdate === update.id){
        setEditSucessful(true)
        setOpenSnack(true)
        setShowModal(false)
      }
    }
  }

  const handleClose = () => {
    setEditSucessful(false)
    setOpenSnack(false)
  }
  

  return(
    <>
      <Button variant="outlined" onClick={() => setShowModal(true)}>Edit Update</Button>
      {showModal && 
        <Modal onClose={() => setShowModal(false)}>
          <>
            <TextField label="Title" variant="filled" value={title} onChange={e => setTitle(e.target.value)} />
            <TextField label="Description" variant="filled" value={description} onChange={e => setDescription(e.target.value)} multiline />
            <Button onClick={editUpdateHandler} > Confirm </Button>
          </>
        </Modal>  
      }
      {editSuccessful && 
      <Snackbar
        open={openSnack}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Update edit successful"

      />
      }
    </>

  )
}

export default EditUpdateModal