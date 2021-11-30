import { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import Home from './components/Home'
import * as sessionActions from "./store/session";
import { CurrentUser, State } from 'interfaces';
import Nav from "components/Nav";
import ProductForm from "components/ProductForm";
import ProductPage from "components/ProductPage";
import { findProduct } from "store/products";


function App() {
  
  const dispatch:any = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser:CurrentUser = useSelector((state: State) => state.session.user);

  useEffect(() => {
    dispatch(sessionActions.restoreUser());
    dispatch(findProduct()).then(() => setIsLoaded(true))
  }, [dispatch]);


  
  const productsSlice = useSelector(state => state.products)  

  const products = Object.values(productsSlice)

  return ( isLoaded ?
    <>
    <Nav sessionUser={sessionUser}/>
      <Routes>
        <Route path='/'  element={<Home/>} />
        <Route path='/postproduct' element={<ProductForm sessionUser={sessionUser}/>} />
        <Route path='/products/productId' element={<ProductPage products={products}/>} />
      </Routes>
    </>
    :
    <>
      <Nav sessionUser={sessionUser} />
      <img src="https://c.tenor.com/28DFFVtvNqYAAAAC/loading.gif" alt="loading screen"/>
    </>
  );
}

export default App;