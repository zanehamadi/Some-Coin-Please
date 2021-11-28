export interface DefaultUser{
  id: number;
  username: string;
  profile_picture: string;
  toSafeObject: () => void
  validatePassword: (password: string) => boolean
}

export interface CurrentUser extends DefaultUser{
  created_at: string;
  updated_at: string;
  balance: number;
}

export interface LoginUser extends CurrentUser{
  hashedPassword: string;
}

export interface LoginCredentials{
  credential: string;
  password: string;
}

export interface ReduxActions{
  type:string;
  payload?: any 
}

export interface SessionState{
  user: CurrentUser
}

export interface State {
  session: SessionState
}

export interface SignupCredentials{
  username: string;
  email: string;
  password: string;
  profilePicture: string;
}

export interface ButtonStyling{
  color: string;
  backgroundColor: string;
}



