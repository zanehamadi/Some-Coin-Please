import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ThemeProvider from '@mui/system/ThemeProvider';
import {theme} from '../styling-variables'


function LoginForm() {

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

  return (
    <ThemeProvider theme={theme} >
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <TextField label="Username/Email" value={credential} onChange={(e) => setCredential(e.target.value)} required />
        <TextField label="Password" type="password" value={password}  onChange={(e) => setPassword(e.target.value)} required />
        <Button color={errors.length ? "error" : "primary"} type="submit">Log In</Button>
      </form>
    </ThemeProvider>
  );
}

export default LoginForm;