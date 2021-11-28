import { useState } from "react";
import { useDispatch} from "react-redux";
import * as sessionActions from "../../store/session";
import Button from '@mui/material/Button';





function SignupForm() {

  const dispatch:any = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string>("")
  const [errors, setErrors] = useState<Array<string>>([]);



  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signupUser({ email, username, password, profilePicture }))
        .catch(async (res:any) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Email
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Confirm Password
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Profile Picture
        <input
          value={profilePicture}
          onChange={(e) => setProfilePicture(e.target.value)}
          required
        />
      </label>
      <Button type="submit" variant="outlined" color={errors.length ? "error" : "secondary"} >Sign Up</Button>
    </form>
  );
}

export default SignupForm;