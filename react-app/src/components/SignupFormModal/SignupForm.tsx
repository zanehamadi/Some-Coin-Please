import { useState } from "react";
import { useDispatch} from "react-redux";
import * as sessionActions from "../../store/session";
import Button from '@mui/material/Button';
import { loadUsers } from "store/users";
import TextField from '@mui/material/TextField';




function SignupForm() {

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

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <TextField label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
      
      <label>
        Profile Picture
        <input type="file" onChange={updateFile}/>
      </label>
      <Button type="submit" variant="outlined" color={errors.length ? "error" : "primary"} >Sign Up</Button>
    </form>
  );
}

export default SignupForm;