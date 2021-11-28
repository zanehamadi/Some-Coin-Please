import { csrfFetch } from "./csrf";
import { ProductAttributes, ReduxActions } from "interfaces";

const POST_PRODUCT:string = "products/POST_PRODUCT"

const postProduct = (product:ProductAttributes) => {
  let postProductAction: ReduxActions = {
    type: POST_PRODUCT,
    payload: product
  }
  return postProductAction
}


export const createProduct = (productData:ProductAttributes) => async (dispatch:any) => {
  const {title, user_id, description, funding, investors, rewards, tags, summary, image, video} = productData
  const formData = new FormData()
  formData.append('user_id', `${user_id}`)
  formData.append('title', title)
  formData.append('description', description)
  formData.append('funding',`${funding}`)
  formData.append('investors', `${investors}`)
  formData.append('rewards', `${rewards}`)
  formData.append('tags',`${tags}`)
  formData.append('summary', `${summary}`)

  if(image) formData.append('image', image)
  if(video) formData.append('video', video)
  const res = await csrfFetch('/api/products', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
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
  switch(action.type){
    case POST_PRODUCT: {
      if(!state[action.product.id]){
        const newState = {
          ...state,
          [action.product.id]: action.review
        };
        return newState
      }
      return{
        ...state,
        [action.product.id]: {
          ...state[action.product.id],
          ...action.product
        }
      };
    }
    default:
      return state;
  }
}

export default productReducer

