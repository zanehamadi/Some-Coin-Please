import { csrfFetch } from "./csrf";
import {InvestmentAttributes, ReduxActions} from  "interfaces"


const POST_INVESTMENT: string = "investments/POST_INVESTMENTS"
const GET_INVESTMENT: string = "investments/GET_INVESTMENTS"



const postInvestment = (investment: InvestmentAttributes) => {
  let postInvestmentAction: ReduxActions = {
    type: POST_INVESTMENT,
    payload: investment
  }
  return postInvestmentAction
}

const getInvestments = (investments: InvestmentAttributes) => {
  let getInvestmentsAction: ReduxActions = {
    type: GET_INVESTMENT,
    payload: investments
  }

  return getInvestmentsAction
}


export const loadInvestments = () => async (dispatch:any):Promise<any> => {
  const res = await csrfFetch('/api/investments')
  if(res.ok){
    const investments = await res.json();
    dispatch(getInvestments(investments))
  }
}


export const createInvestment = (investmentData: InvestmentAttributes) => async(dispatch:any) => {
  const res = await csrfFetch('/api/investments', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(investmentData)
  });

  if(res.ok){
    const newInvestment = await res.json();
    dispatch(postInvestment(newInvestment));
  }
}


const initialState = {}

const investmentReducer = (state = initialState, action:any) => {
  switch(action.type){

    case GET_INVESTMENT: {
      const newState = {}
      action.payload.investments.forEach((investment:any) => newState[investment.id] = investment)
      return newState
    }
    case POST_INVESTMENT: {
      const newState = {...state}
      newState[action.payload.id] = action.payload
      return newState
    }

    default:
      return state
  }
}

export default investmentReducer

