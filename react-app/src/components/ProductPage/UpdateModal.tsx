import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Modal from '@mui/material/Modal';

import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import {createUpdate, editUpdate, loadUpdates} from '../../store/updates'
import {useUpdateTrigger} from '../../context/updateTrigger'
import { loadProducts } from 'store/products';
import Snackbar from '@mui/material/Snackbar';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/system/Box';

interface UpdateModal{
  product: any;
  update: any;
}

function UpdateModal({product, update}: UpdateModal){
  
  const [showModal, setShowModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(update ? update.title : '');
  const [description, setDescription] = useState<string>(update ? update.description : '');
  const [validators, setValidators] = useState<Array<string>>([])
  const {updateTrigger, setUpdateTrigger}:any = useUpdateTrigger()
  const [openSnack, setOpenSnack] = useState<boolean>(false)
  const [editSuccessful, setEditSucessful] = useState<boolean>(false)
  const [progress, setProgress] = useState(0)

  
  const dispatch = useDispatch()
  

  const handleClose = () => {
    setEditSucessful(false)
    setOpenSnack(false)
    setProgress(0)
  }

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
      
      setTitle('')
      setDescription('')
      await dispatch(createUpdate(updateData))
      setProgress(50)
      await dispatch(loadUpdates())
      setProgress(75)
      await dispatch(loadProducts())
      setProgress(100)
      setEditSucessful(true)
      setOpenSnack(true)
      setUpdateTrigger(!updateTrigger)
      setShowModal(false)

    }
    setValidators(updateValidators)
    
  }

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
      if(editedUpdate === update.id){
        setProgress(50)
        await dispatch(loadUpdates())
        setProgress(75)
        await dispatch(loadProducts())
        setProgress(100)
        setUpdateTrigger(!updateTrigger)
        setEditSucessful(true)
        setOpenSnack(true)
        setShowModal(false)
      }
    }
  }

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return(
    <>

    {update ?
    
    <>
      <Button variant="outlined" onClick={() => setShowModal(true)}>Edit Update</Button>
      <Modal 
        onClose={() => setShowModal(false)}
        open={showModal}
      >
        <Box sx={style}>
            <TextField label="Title" style={{"width":"100%"}} variant="filled" value={title} onChange={e => setTitle(e.target.value)} />
            <br/>
            <TextField label="Description" style={{"width":"100%"}} variant="filled" value={description} onChange={e => setDescription(e.target.value)} multiline />
            <br/>
            <Button size="large" style={{"marginTop":"10px"}} variant="outlined" color="primary"  onClick={editUpdateHandler} > Confirm </Button>
            <LinearProgress variant="determinate" value={progress} color="secondary" />
        </Box>
      </Modal>

      {editSuccessful &&
      <Snackbar
          open={openSnack}
          autoHideDuration={3000}
          onClose={handleClose}
          message="Sucessfully edited the update."

      />
    }
    </>
    :
      <>
      <Button variant="outlined" onClick={() => setShowModal(true)}>Post an Update</Button>
        
        <Modal 
        onClose={() => setShowModal(false)}
        open={showModal}
        >
          <Box sx={style}>
            <div className="update-modal" style={{margin: '10em'}}>
              {validators.length ? 
              <>
              <ul>
                {validators.map(validators => 
                  <li>{validators}</li>
                )}
              </ul>
              </>
              :
              <>
              </>
              }
              <TextField style={{"width":"100%"}} required value={title} onChange={e => setTitle(e.target.value)} label="Title of Update"/>
              <br/>
              <TextField style={{"width":"100%", "marginTop":"10px"}} required multiline minRows={10} maxRows={10}  value={description} onChange={e => setDescription(e.target.value) } label="Description"/>
              <br/>
              <Button size="large" style={{"marginTop":"10px"}} variant="outlined" color="primary" onClick={submitUpdate}>Post Update</Button>
              <LinearProgress variant="determinate" value={progress} color="secondary" />
            </div>
          </Box>
        </Modal>
        {editSuccessful &&
      <Snackbar
          open={openSnack}
          autoHideDuration={3000}
          onClose={handleClose}
          message="Sucessfully created an update."

      />
    }  
      </>
    }
      
      

    </>

  )
}

export default UpdateModal