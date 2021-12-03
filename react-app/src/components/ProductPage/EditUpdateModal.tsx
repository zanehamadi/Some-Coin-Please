import { useState } from 'react';
import { Modal } from '../../context/Modal';
import Button from '@mui/material/Button';
import {outlinedButton} from '../styling-variables'
import {editUpdate, loadUpdates} from '../../store/updates'
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';


interface EditUpdateModalProps{
  update: any;
}

function EditUpdateModal({update}: EditUpdateModalProps){
  const [showModal, setShowModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(update.title);
  const [description, setDescription] = useState<string>(update.description);
  const [editSuccessful, setEditSucessful] = useState<boolean>(false)

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
      //@ts-ignore
      if(editedUpdate) setEditSucessful(true)
    }
  }
  
  const closeModalButton = () => {
    setShowModal(false)
    setEditSucessful(false)
  }

  return(
    <>
      <Button variant="outlined" style={outlinedButton} onClick={() => setShowModal(true)}>Edit Update</Button>
      {showModal && 
        <Modal onClose={() => setShowModal(false)}>
        <>
          {editSuccessful ?
          
          <>
            <h3>Update has been successfuly edited.</h3>
            <span> You can now close this.</span>
            <Button onClick={closeModalButton}> close </Button>
          </>

          :
          <>
            <TextField label="Title" variant="filled" value={title} onChange={e => setTitle(e.target.value)} />
            <TextField label="Description" variant="filled" value={description} onChange={e => setDescription(e.target.value)} multiline />
            <Button onClick={editUpdateHandler} > Confirm </Button>
          </>
          }
        </>
        </Modal>  
      }
    </>


  )
}

export default EditUpdateModal