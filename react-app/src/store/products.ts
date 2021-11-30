import { csrfFetch } from "./csrf";
import { ProductAttributes, ReduxActions } from "interfaces";

const POST_PRODUCT:string = "products/POST_PRODUCT"
const GET_PRODUCTS:string = "products/GET_PRODUCTS"

const postProduct = (product:ProductAttributes) => {
  let postProductAction: ReduxActions = {
    type: POST_PRODUCT,
    payload: product
  }
  return postProductAction
}

const getProducts = (product:ProductAttributes) => {
  let getProductsAction: ReduxActions ={
    type: GET_PRODUCTS,
    payload: product
  }
  return getProductsAction
}


export const findProduct = () => async (dispatch:any) => {
  const res = await csrfFetch(`/api/products/`)
  if(res.ok){
    const products = await res.json();
    dispatch(getProducts(products))
    return products
  }
}

export const createProduct = (productData:ProductAttributes) => async (dispatch:any) => {
  const {title, user_id, description, funding, investors, rewards, tags, summary, image} = productData
  const formData = new FormData()
  formData.append('user_id', `${user_id}`)
  formData.append('title', title)
  formData.append('description', description)
  formData.append('funding',`${funding}`)
  formData.append('investors', `${investors}`)
  formData.append('rewards', JSON.stringify(rewards))
  formData.append('tags',  tags)
  formData.append('summary', summary)

  if(image) formData.append('image', image)

  const res = await csrfFetch('/api/products', {
    method: 'POST',
    headers: {"Content-Type": "multipart/form-data"},
    body: formData
  });

  if(res.ok){
    const newProduct = await res.json();
    dispatch(postProduct(newProduct));
    return newProduct
  };
};


const initialState = {}

const productReducer = (state = initialState, action:any) => {
  console.log(action)
  switch(action.type){

    case GET_PRODUCTS: {
      return{...state, ...action.payload}
    }
    
    case POST_PRODUCT: {
      if(!state[action.payload.id]){
        const newState = {
          ...state,
          [action.payload.id]: action.review
        };
        return newState
      }
      
      return{
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload
        }
      };
    }

    
    default:
      return state;
  }
}

export default productReducer

