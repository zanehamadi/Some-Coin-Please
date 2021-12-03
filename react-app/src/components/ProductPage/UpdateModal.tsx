import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Modal } from '../../context/Modal';
import Button from '@mui/material/Button';
import { outlinedButton } from 'components/styling-variables';
import { useDispatch } from 'react-redux';
import {createUpdate} from '../../store/updates'
import { useNavigate } from 'react-router';

interface UpdateModal{
  product: any;
}

function UpdateModal({product}: UpdateModal){

  const [showModal, setShowModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const dispatch = useDispatch()
  const navigate = useNavigate()
  

  const submitUpdate = async () => {
    const updateValidators = []
    if(title.length > 256 ) updateValidators.push('Title can not be longer than 256 characters.')
    if(title.length < 1 ) updateValidators.push('You must provide a title.')
    if(description.length < 15) updateValidators.push('Description must be longer than 15 characters.')
    if(description.length > 2000) updateValidators.push('Description can not be longer than 2000 characters.')
    
    if(!updateValidators.length){
      const updateData = {
        title,
        description,
        product_id: product.id
      }
  
      await dispatch(createUpdate(updateData))
      navigate(`/products/${product.id}`)

    }
  }

  return(
    <>
    <Button variant="outlined" style={outlinedButton} onClick={() => setShowModal(true)}>Post an Update</Button>
    {showModal &&
      
      <Modal onClose={() => setShowModal(false)}>
      <div>

        <TextField required value={title} onChange={e => setTitle(e.target.value)} label="Title of Update"/>
        <TextField required multiline minRows={10} maxRows={10}  value={description} onChange={e => setDescription(e.target.value) } label="Description"/>
        <Button onClick={submitUpdate}>Post Update</Button>
      </div>
      </Modal>  
      
    }
    
    </>

  )
}

export default UpdateModal