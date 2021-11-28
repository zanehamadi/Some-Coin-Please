import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {CurrentUser} from 'interfaces'
import LoginFormModal from '../LoginFormModal'
import SignupFormModal from '../SignupFormModal'
import { logoutUser, loginUser } from 'store/session';
import { useDispatch } from 'react-redux';


interface NavProps{
  sessionUser?: CurrentUser;

}

function Nav({sessionUser}:NavProps){

  const dispatch:any = useDispatch()

  const demoFunction = (e:any) => {
    e.preventDefault()
    const credential:string = 'Demo';
    const password:string = 'password'
    return dispatch(loginUser({ credential, password }))
  }

  const buttonStyling:any = {
    color: 'white',
    backgroundColor: '#F3BA2C'
  }

  return(
    <>
    {
      sessionUser ?
          <Stack direction="row" spacing={3}>
              <Button variant="contained" onClick={() => dispatch(logoutUser())} style={buttonStyling} >Logout</Button>
          </Stack>
        
      :
          <Stack direction="row" spacing={2}>
            <LoginFormModal/>
            <SignupFormModal/>
            <Button variant="contained" onClick={e => demoFunction(e)}>Demo</Button>
          </Stack>

    }
    </>
  )
}

export default Nav