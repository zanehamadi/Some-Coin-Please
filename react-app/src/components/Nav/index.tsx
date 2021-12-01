import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {CurrentUser, ButtonStyling} from 'interfaces'
import LoginFormModal from '../LoginFormModal'
import SignupFormModal from '../SignupFormModal'
import { logoutUser, loginUser } from 'store/session';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router'
import Search from '../Search/index'
import {primary, outlinedButton} from '../styling-variables'


interface NavProps{
  sessionUser?: CurrentUser;
  products?: any;
  users?: any;

}

function Nav({sessionUser, products, users}:NavProps){

  const dispatch:any = useDispatch()
  const navigate = useNavigate()

  const demoFunction = (e:any) => {
    e.preventDefault()
    const credential:string = 'Demo';
    const password:string = 'password'
    return dispatch(loginUser({ credential, password }))
  }

  const buttonStyling:ButtonStyling = {
    color: 'black',
    backgroundColor: primary
  }

  return(
    <>
    {
      sessionUser ?
          <Stack direction="row" spacing={3}>
              <Button variant="contained" onClick={() => dispatch(logoutUser())} style={buttonStyling} >Logout</Button>
              <Button variant="outlined" style={outlinedButton} onClick={() => navigate('/')}>Home</Button>
              <Search users={users} products={products}/>
          
          </Stack>
        
      :
          <Stack direction="row" spacing={2}>
            <LoginFormModal/>
            <SignupFormModal/>
            <Button variant="contained" onClick={e => demoFunction(e)} style={buttonStyling} >Demo</Button>
            <Button variant="outlined" style={outlinedButton} onClick={() => navigate('/')}>Home</Button>
            <Search users={users} products={products}/>
          </Stack>

    }
    </>
  )
}

export default Nav