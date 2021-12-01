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

const getProducts = (products:ProductAttributes) => {
  let getProductsAction: ReduxActions ={
    type: GET_PRODUCTS,
    payload: products
  }
  return getProductsAction
}


export const loadProducts = () => async (dispatch:any):Promise<any> => {
  const res = await csrfFetch(`/api/products/`)
  if(res.ok){
    const products = await res.json();
    dispatch(getProducts(products))
    return ''
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

  formData.append('image', image)

  const res = await csrfFetch('/api/products', {
    method: 'POST',
    headers: {"Content-Type": "multipart/form-data"},
    body: formData
  });

  if(res.ok){
    const newProduct = await res.json();
    dispatch(postProduct(newProduct));
    return newProduct.id
  };
};


const initialState = {}

const productReducer = (state = initialState, action:any) => {
  
  switch(action.type){

    case GET_PRODUCTS: {
      const newState = {}
      action.payload.products.forEach((product:any) => newState[product.id] = product)
      return newState
    }
    
    case POST_PRODUCT: {
      const newState = {...state}
      newState[action.payload.id] = action.payload
      return newState
    }

    
    default:
      return state;
  }
}

export default productReducer

