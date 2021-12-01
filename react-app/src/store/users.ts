import { csrfFetch } from "./csrf";
import {DefaultUser, ReduxActions} from 'interfaces'

const GET_USERS = 'users/GET_USERS'


const getUsers = (users:DefaultUser) => {
  let getUsersAttributes: ReduxActions = {
    type: GET_USERS,
    payload: users
  }
  return getUsersAttributes
}

export const loadUsers = () => async (dispatch:any):Promise<any> => {
  const res = await csrfFetch(`/api/users/`)
  if(res.ok){
    const users = await res.json();
    dispatch(getUsers(users))
    return ''
  }
}


const initialState = {}

const userReducer = (state = initialState, action:any) => {


  switch(action.type){

    case GET_USERS:
      return{...state, ...action.payload.users}
    
    default:
      return state
  }
}

export default userReducer