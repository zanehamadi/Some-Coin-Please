import { csrfFetch } from "./csrf";
import {DefaultUser, ReduxActions, CurrentUser, CoinPurchaseAttributes} from 'interfaces'

const GET_USERS = 'users/GET_USERS'
const UPDATE_USER = 'users/UPDATE_USERS'

const getUsers = (users:DefaultUser) => {
  let getUsersAttributes: ReduxActions = {
    type: GET_USERS,
    payload: users
  }
  return getUsersAttributes
}



const updateUser = (user: CurrentUser) => {
  let updateUserAction: ReduxActions = {
    type: UPDATE_USER,
    payload: user
  }
  return updateUserAction
}

export const editUser = (userData:CurrentUser) => async(dispatch:any) => {
  
  const res = await csrfFetch(`/api/users/${userData.id}`, {
    method: 'PUT',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(userData)
  })
  if(res.ok){
    const editedUser = await res.json();
    dispatch(updateUser(editedUser));
    return editedUser.id
  }

}


export const loadUsers = () => async (dispatch:any):Promise<any> => {
  const res = await csrfFetch(`/api/users/`)
  if(res.ok){
    const users = await res.json();
    dispatch(getUsers(users))
  }
}

export const purchaseCoin = (purchase:CoinPurchaseAttributes) => async():Promise<any> => {
  const res = await csrfFetch(`/api/users/${purchase.id}/charges`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(purchase)
  })

  if(res.ok){
    return 'GOOD'
  }
}



const initialState = {}

const userReducer = (state = initialState, action:any) => {


  switch(action.type){

    case GET_USERS:
      const newState = {}
      action.payload.users.forEach((user:any) => newState[user.id] = user)
      return (newState)
    
    case UPDATE_USER: {
      const newState = {...state};
      newState[action.payload.id] = action.payload
      return newState
    }

    
    default:
      return state
  }
}

export default userReducer