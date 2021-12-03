import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {CurrentUser} from 'interfaces'
import LoginFormModal from '../LoginFormModal'
import SignupFormModal from '../SignupFormModal'
import { logoutUser, loginUser } from 'store/session';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router'
import Search from '../Search/index'
import ThemeProvider from '@mui/system/ThemeProvider';
import {theme} from '../styling-variables'

interface NavProps{
  sessionUser?: CurrentUser;
  products?: any;

}

function Nav({sessionUser, products}:NavProps){

  const dispatch:any = useDispatch()
  const navigate = useNavigate()

  const demoFunction = (e:any) => {
    e.preventDefault()
    const credential:string = 'Demo';
    const password:string = 'password'
    return dispatch(loginUser({ credential, password }))
  }



  return(
    <>
    <ThemeProvider theme={theme}>
    {
      sessionUser ?


      <Stack direction="row" spacing={3}>
              <Button variant="contained" color="primary" onClick={() => dispatch(logoutUser())}  >Logout</Button>
              <Button variant="outlined"  color="primary" onClick={() => navigate('/')}>Home</Button>
              <Search products={products}/>
              <Button variant="outlined" color="primary" onClick={() => navigate('/postproduct')}>Post a Product</Button>
          </Stack>
        
        :
        <Stack direction="row" spacing={2}>
            <LoginFormModal/>
            <SignupFormModal/>
            <Button variant="contained" color="primary" onClick={e => demoFunction(e)}  >Demo</Button>
            <Button variant="outlined"  color="primary" onClick={() => navigate('/')}>Home</Button>
            <Search products={products}/>
          </Stack>

}
    </ThemeProvider>
    </>
  )
}

export default Nav