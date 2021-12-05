import { useState } from 'react';
import Modal from '@mui/material/Modal';
import { useDispatch} from "react-redux";
import * as sessionActions from "../../store/session";
import Button from '@mui/material/Button';
import { loadUsers } from "store/users";
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';


function SignupFormModal() {
  const [showModal, setShowModal] = useState<boolean>(false);
  
  
  const dispatch:any = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<any>(null)
  const [errors, setErrors] = useState<Array<string>>([]);


  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signupUser({ email, username, password, profilePicture }))
      .then(() => {
        setEmail('')
        setUsername('')
        setPassword('')
        setConfirmPassword('')
        setProfilePicture(null)
        setErrors([])
      })  
      .then(() => {
        dispatch(loadUsers())
      })
      .catch(async (res:any) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  
  const updateFile = (e:any) => {
    const file = e.target.files[0];
    if (file) setProfilePicture(file);
  };



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
      <Button sx={{ my: 2, color: 'white', display: 'block' }}  variant="outlined" onClick={() => setShowModal(true)}>Sign Up</Button>
        <Modal 
        onClose={() => setShowModal(false)}
        open={showModal}
        >
          <Box sx={style}>
            <form onSubmit={handleSubmit}>
                <ul>
                  {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <TextField style={{'marginTop':'10px'}} label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <TextField style={{'marginTop':'10px'}} label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <TextField style={{'marginTop':'10px'}} label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                <br/>

                <span>
                <h3>Profile Picture</h3>
                <input style={{'marginTop':'10px'}} type="file" onChange={updateFile}/>
                </span>
                
                <Button type="submit" variant="outlined" color={errors.length ? "error" : "primary"} >Sign Up</Button>
            </form>
          </Box>
        </Modal>
    </>
  );
}

export default SignupFormModal;