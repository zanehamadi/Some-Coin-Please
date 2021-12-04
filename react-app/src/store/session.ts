import { csrfFetch } from './csrf';
import { CurrentUser, LoginCredentials , ReduxActions, SignupCredentials} from 'interfaces';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user:CurrentUser) => {
  let setUserAction: ReduxActions = {
    type: SET_USER,
    payload: user
  }
  return setUserAction
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const loginUser = (user: LoginCredentials) => async (dispatch:any) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const restoreUser = () => async (dispatch:any) => {
  const res = await csrfFetch('/api/session');
  const data = await res.json();
  dispatch(setUser(data.user));
  return res;
};


export const signupUser = (user:SignupCredentials) => async (dispatch:any) => {
  const { username, email, password, profilePicture} = user;
  const formData = new FormData()
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);


  if (profilePicture) formData.append("image", profilePicture);

  const res = await csrfFetch(`/api/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
;
  const data = await res.json();
  dispatch(setUser(data.user));
};

export const logoutUser = () => async (dispatch:any) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};



const initialState = { user: null };

const sessionReducer = (state = initialState, action:ReduxActions) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:  
      return state;
  }
};

export default sessionReducer;