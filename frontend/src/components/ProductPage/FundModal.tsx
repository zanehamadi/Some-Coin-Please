import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Input from '@mui/material/Input';
import {editUser, loadUsers} from '../../store/users'
import {createInvestment, loadInvestments, updateInvestment} from '../../store/investments'
import { useDispatch } from 'react-redux';
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';
import { loadProducts } from 'store/products';
import { restoreUser } from 'store/session';
import Box from '@mui/material/Box';

interface FundModalProps{
  sessionUser?: any;
  product?: any;
  investments?:any;
}

function FundModal({sessionUser, product, investments}: FundModalProps){

  const [showModal, setShowModal] = useState<boolean>(false);
  const [validators, setValidators] = useState<Array<string>>([])
  const [amount, setAmount] = useState<any>('')
  const [progress, setProgress] = useState<number>(0)
  const [fundSucessful, setFundSucessful] = useState<boolean>(false)
  const [openSnack, setOpenSnack] = useState<boolean>(false)


  const dispatch = useDispatch()
  
  const submitInvestment = async () => {
    let submitValidators = []
    if(+sessionUser?.balance < +amount) submitValidators.push('Insufficient amount in account.')
    if(!amount) submitValidators.push('Please enter a valid amount.')

    if(!submitValidators.length){
      
      if(product.funders.includes(sessionUser.id)){
        let investment = investments.find((invest:any) => 
          (+invest.user_id === +sessionUser.id) && (+invest.product_id === +product.id)
        )

        await dispatch(updateInvestment({
          amount: (+investment.amount + +amount),
          id: +investment.id
        }))
      }else{
        await dispatch(createInvestment({
          product_id: product.id,
          user_id: sessionUser.id,
          amount
        }))
      }
      setProgress(25)
      await dispatch(editUser({
        id: sessionUser.id,
        username: sessionUser.username,
        balance: sessionUser.balance - amount,
        profile_picture: sessionUser.profile_picture
      }))
      setProgress(50)

      await dispatch(loadUsers())
      setProgress(60)
      await dispatch(loadInvestments())
      setProgress(70)
      await dispatch(loadProducts())
      setProgress(80)
      await dispatch(restoreUser())
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
    setAmount('')
  }

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 300,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
  };

  return(
    <>
    <Button variant="outlined" onClick={() => setShowModal(true)}>Fund this product.</Button> 
      <Modal 
      open={showModal}
      onClose={() => setShowModal(false)}

      >
        <Box className="fund-product-modal" sx={style}>
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
            style={{width:'100px'}}
            />          
            
            <Button color={validators.length ? "error" : "primary"} onClick={submitInvestment}>Invest</Button>
            <LinearProgress color="secondary" variant="determinate" value={progress} />
          </div>
        </Box>
      </Modal>  

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