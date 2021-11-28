import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {CurrentUser} from 'interfaces'
import LoginFormModal from '../LoginFormModal'

interface NavProps{
  sessionUser: CurrentUser;
}
function Nav({sessionUser}:NavProps){

  return(
    <>
    {
      sessionUser ?
          <Stack direction="row" spacing={3}>
            <Button>Logout</Button>
          </Stack>
        
      :
          <Stack direction="row" spacing={2}>
            <LoginFormModal/>
            {/* <Button>Signup</Button> */}
          </Stack>

    }
    </>
  )
}

export default Nav