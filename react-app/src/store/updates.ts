import { csrfFetch } from "./csrf";
import {UpdateAttributes, ReduxActions} from  "interfaces"

const POST_UPDATE:string = "updates/POST_UPDATES"
const GET_UPDATES:string = "updates/GET_PRODUCTS"

const postUpdate = (update:UpdateAttributes) => {
  let postUpdateAction: ReduxActions = {
    type: POST_UPDATE,
    payload: update
  } 
  return postUpdateAction
}

const getUpdates = (updates: UpdateAttributes) => {
  let getUpdatesAction: ReduxActions = {
    type: GET_UPDATES,
    payload: updates
  }
  return getUpdatesAction
}


export const loadUpdates = () => async (dispatch: any):Promise<any> => {
  const res = await csrfFetch('/api/updates')
  if(res.ok){
    const updates = await res.json();
    dispatch(getUpdates(updates))
  }
}


export const createUpdate = (updateData: UpdateAttributes) => async(dispatch:any) => {
    const res = await csrfFetch('/api/updates', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(updateData)
  });
  
  if(res.ok){
    const newUpdate = await res.json();
    dispatch(postUpdate(newUpdate));
  }
};


const initialState = {}

const updateReducer = (state = initialState, action:any) => {
  switch(action.type){

    case GET_UPDATES: {
      const newState = {}
      action.payload.updates.forEach((update:any) => newState[update.id] = update)
      return newState
    }
    case POST_UPDATE: {
      const newState = {...state}
      newState[action.payload.id] = action.payload
      return newState
    }

    default: 
      return state;
  }
}

export default updateReducer