import { useState } from 'react';
import { Modal } from '../../context/Modal';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {editUser, purchaseCoin} from '../../store/users'
import { useDispatch } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import LinearProgress from '@mui/material/LinearProgress';



function CoinPurchaseModal({sessionUser}:any) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [amount, setAmount] = useState<any>('');
  const [validators, setValidators] = useState<Array<string>>([]);
  const [openSnack, setOpenSnack] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)


  
  const dispatch = useDispatch()

  const handleClose = () => {
    setOpenSnack(false)
    setAmount(0)
    setProgress(0)
  }


  const handlePurchase = async () => {
    let id = +sessionUser.id
    let purchaseValidator = []
    if(amount <= 0) purchaseValidator.push('Please enter a valid amount.')
    if(amount >= 1000000) purchaseValidator.push('Amount can be no greator than $999,999.99')
    if(!purchaseValidator.length){
    const res = await dispatch(purchaseCoin({id, amount})) 
    setProgress(50)
    //@ts-ignore
    if(res === 'GOOD'){
      await dispatch(editUser({
        id: sessionUser.id,
        username: sessionUser.username,
        balance: (+sessionUser.balance + +amount),
        profile_picture: sessionUser.profile_picture
      }))
      setProgress(100)
      setShowModal(false)
      setAmount(0)
      setOpenSnack(true)

    }
    
  }
  
  setValidators(purchaseValidator)
  }

  return (
    <>
      <Button variant="outlined" onClick={() => setShowModal(true)}>Purchase Coin</Button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="Purchase Modal">
            {validators.length ?
            
            <ul>
              {validators.map(validator => <li>{validator}</li>)}
            </ul>

            :
            <>
            </>
          
            }
            <h2>Want to purchase coin?</h2>
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
            <Button onClick={handlePurchase}>Purchase</Button>
            <LinearProgress variant="determinate" value={progress} />

          </div>
        </Modal>
      )}

      <Snackbar
      open={openSnack}
      autoHideDuration={3000}
      onClose={handleClose}
      message="Successfully funded this product"
      />
      
    </>
  );
}

export default CoinPurchaseModal;