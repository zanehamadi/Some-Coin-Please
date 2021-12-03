import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import { Modal } from 'context/Modal';
import { useState } from 'react';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Input from '@mui/material/Input';
import {editUser, loadUsers} from '../../store/users'
import {createInvestment, loadInvestments} from '../../store/investments'
import { useDispatch } from 'react-redux';
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';

interface FundModalProps{
  sessionUser: any;
  product: any;
}

function FundModal({sessionUser, product}: FundModalProps){

  const [showModal, setShowModal] = useState<boolean>(false);
  const [validators, setValidators] = useState<Array<string>>([])
  const [amount, setAmount] = useState<any>('')
  const [progress, setProgress] = useState<number>(0)
  const [fundSucessful, setFundSucessful] = useState<boolean>(false)
  const [openSnack, setOpenSnack] = useState<boolean>(false)


  const dispatch = useDispatch()
  
  const submitInvestment = async () => {
    let submitValidators = []
    if(sessionUser?.balance < amount) submitValidators.push('Insufficient amount in account.')
    if(!amount) submitValidators.push('Please enter a valid amount.')

    if(!submitInvestment.length){
      await dispatch(createInvestment({
        product_id: product.id,
        user_id: sessionUser.id,
        amount
      }))
      setProgress(25)
      await dispatch(editUser({
        id: sessionUser.id,
        username: sessionUser.username,
        balance: sessionUser.balance - amount,
        profile_picture: sessionUser.profile_picture
      }))
      setProgress(50)

      await dispatch(loadUsers())
      setProgress(75)
      await dispatch(loadInvestments())
      setProgress(100)
      setFundSucessful(true)
      setOpenSnack(true)
      setShowModal(false)
      
    }
    setValidators(submitValidators)

  }

  const handleClose = () => {
    setFundSucessful(false)
    setOpenSnack(false)
    setProgress(0)
    setAmount(0)
  }

  return(
    <>
    <Button variant="outlined" onClick={() => setShowModal(true)}>Fund this product.</Button>
    {showModal &&
      
      <Modal onClose={() => setShowModal(false)}>
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

          <Input
          value={amount}
          onChange={e => setAmount(e.target.value)}
          type="number"
          startAdornment={
            <InputAdornment position="start">
              <AttachMoneyIcon color="secondary"/>
            </InputAdornment>
          }
          />          
          
          <Button color={validators.length ? "error" : "primary"} onClick={submitInvestment}>Invest</Button>
          <LinearProgress variant="determinate" value={progress} />
        </div>
      </Modal>  
      
    }
    {fundSucessful &&
    <Snackbar
    open={openSnack}
    autoHideDuration={3000}
    onClose={handleClose}
    message="Successfully funded this product"
    
    />
    }
    
    </>

  )
}

export default FundModal