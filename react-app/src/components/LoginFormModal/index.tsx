import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import ThemeProvider from '@mui/system/ThemeProvider';
import {theme} from '../styling-variables'


function LoginFormModal() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch:any = useDispatch();
  const [credential, setCredential] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<Array<string>>([]);
  

  const handleSubmit = (e:any) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.loginUser({ credential, password }))
      .catch(async (res:any) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }




  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  return (
    <>
    <Button sx={{ my: 2, color: 'white', display: 'block' }}  variant="outlined" onClick={() => setShowModal(true)}>Sign In</Button>
    <Modal 
    open={showModal}
    onClose={() => setShowModal(false)}
    >
      <Box sx={style}>
            <ThemeProvider theme={theme} >
              <form onSubmit={handleSubmit}>
                <ul>
                  {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <TextField label="Username/Email" color="secondary" value={credential} onChange={(e) => setCredential(e.target.value)} required />
                <TextField style={{'marginTop':'10px'}} color="secondary" label="Password" type="password" value={password}  onChange={(e) => setPassword(e.target.value)} required />
                <br />
                <Button size="large" variant="outlined" style={{'marginTop':'10px'}} color={errors.length ? "error" : "primary"} type="submit">Log In</Button>
              </form>
            </ThemeProvider>
      </Box>
    </Modal>
    </>
  );
}

export default LoginFormModal;