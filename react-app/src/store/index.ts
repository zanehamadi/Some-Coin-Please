import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import sessionReducer from './session';
import productReducer from './products';
import userReducer from './users';
import updateReducer from './updates';
import investmentReducer from './investments';

const rootReducer = combineReducers({
  session: sessionReducer,
  products: productReducer,
  users: userReducer,
  updates: updateReducer,
  investments: investmentReducer
});

let enhancer:any;
const isProduction: boolean = process.env.NODE_ENV === 'production'


if (isProduction) {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    //@ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}



const configureStore: (param?: any) => any = (preloadedState?: any) => {
  return createStore(rootReducer, preloadedState, enhancer)
}
  
  export default configureStore;