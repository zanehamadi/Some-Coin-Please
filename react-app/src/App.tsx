import { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import Home from './components/Home'
import * as sessionActions from "./store/session";
import { CurrentUser, State, StateInterface } from 'interfaces';
import Nav from "components/Nav";
import ProductForm from "components/ProductForm";
import ProductPage from "components/ProductPage";
import { loadProducts } from "store/products";
import {loadUsers} from "store/users"


function App() {
  
  const dispatch:any = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser:CurrentUser = useSelector((state: State) => state.session.user);
  

  useEffect(() => {
    dispatch(sessionActions.restoreUser());
    dispatch(loadProducts())
    dispatch(loadUsers()).then(() => setIsLoaded(true))
  }, [dispatch]);


  const productsSlice = useSelector((state:StateInterface) => state.products)
  const usersSlice = useSelector((state:StateInterface) => state.users)

  const products = Object.values(productsSlice)
  const users = Object.values(usersSlice)


  console.log(users)





  return ( isLoaded ?
    <>
    <Nav sessionUser={sessionUser} products={products} />
      <Routes>
        <Route path='/'  element={<Home/>} />
        <Route path='/postproduct' element={<ProductForm sessionUser={sessionUser}/>} />
        <Route path='/products/:productId' element={<ProductPage products={products} users={users}/>} />
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