import Button from '@mui/material/Button';
import {CurrentUser} from 'interfaces'
import LoginFormModal from '../LoginFormModal'
import SignupFormModal from '../SignupFormModal'
import { logoutUser, loginUser } from 'store/session';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router'
import AppBar from '@mui/material/AppBar';
import ThemeProvider from '@mui/system/ThemeProvider';
import {theme} from '../styling-variables'
import CoinPurchaseModal from '../CoinPurchaseModal'
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
// import './nav.css'

interface NavProps{
  sessionUser?: CurrentUser;

}

function Nav({sessionUser}:NavProps){

  const [userMenu, setUserMenu] = useState<null | HTMLElement>(null);
  const dispatch:any = useDispatch()
  const navigate = useNavigate()  

  const demoFunction = (e:any) => {
    e.preventDefault()
    const credential:string = 'Demo';
    const password:string = 'password'
    return dispatch(loginUser({ credential, password }))
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenu(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setUserMenu(null);
  };

  const logoutHandler = async () => {
    await dispatch(logoutUser())
    navigate('/')
  }

  return(
    <ThemeProvider theme={theme}>
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <MonetizationOnIcon fontSize="large" color="secondary" onClick={() => navigate('/')} id="home-button" />
          </Typography>
          {sessionUser ?
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button variant="outlined" sx={{ my: 2, color: 'white', display: 'block' }} color="primary" onClick={logoutHandler}  >Logout</Button>
            <Button variant="outlined" sx={{ my: 2, color: 'white', display: 'block' }} color="primary" onClick={() => navigate('/postproduct')}>Post a Product</Button>
            <CoinPurchaseModal sessionUser={sessionUser} />
          </Box>

          :
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <LoginFormModal/>
            <SignupFormModal/>
            <Button variant="outlined" sx={{ my: 2, color: 'white', display: 'block' }}  color="primary" onClick={e => demoFunction(e)}>Demo</Button>
          </Box>

        
          }

          {sessionUser && 
            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="profile picture" src={sessionUser.profile_picture} />
              </IconButton>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={userMenu}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(userMenu)}
                onClose={handleCloseUserMenu}
              >
                  <MenuItem key={'username'} id="user-menu-item">
                    <Typography textAlign="center" >{sessionUser.username}</Typography>
                  </MenuItem>
                  <MenuItem key={'balance'} id="balance-menu-item">
                    <Typography textAlign="center">{`Balance: ${sessionUser.balance}`}</Typography>
                  </MenuItem>
              </Menu>
            </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  )
}

export default Nav