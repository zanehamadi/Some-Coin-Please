import { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import Home from './components/Home'
import * as sessionActions from "./store/session";
import {State, StateInterface } from 'interfaces';
import Nav from "components/Nav";
import ProductForm from "components/ProductForm";
import ProductPage from "components/ProductPage";
import { loadProducts } from "store/products";
import {loadUsers} from "./store/users"
import {loadUpdates} from "./store/updates"
import { loadInvestments } from "store/investments";
import EditForm from './components/ProductPage/EditForm'
import { useUpdateTrigger } from "context/updateTrigger";



function App() {
  
  const dispatch:any = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const {updateTrigger, setUpdateTrigger}:any = useUpdateTrigger()
  
  useEffect(() => {
    dispatch(sessionActions.restoreUser())
    .then(dispatch(loadProducts()))
    .then(dispatch(loadUsers()))
    .then(dispatch(loadUpdates()))
    .then(dispatch(loadInvestments()))
    .then(() => setIsLoaded(true))
    .then(setUpdateTrigger(!updateTrigger))
  }, [dispatch]);
  
  
  const productsSlice = useSelector((state:StateInterface) => state.products)
  const usersSlice = useSelector((state:StateInterface) => state.users)
  const investmentSlice = useSelector((state:StateInterface) => state.investments)
  const updatesSlice = useSelector((state:StateInterface) => state.updates)

  const products = Object.values(productsSlice)
  const users = Object.values(usersSlice)
  const updates = Object.values(updatesSlice)
  const investments = Object.values(investmentSlice)
  
  const sessionUser:any = useSelector((state: State) => state.session.user);

  return ( isLoaded ?
    <>
      <Nav sessionUser={sessionUser} />
        <Routes>
          <Route path='/'  element={<Home sessionUser={sessionUser} products={products} investments={investments} />} />
          <Route path='/postproduct' element={<ProductForm sessionUser={sessionUser}/>} />
          <Route path='/products/:productId' element={<ProductPage products={products} users={users} sessionUser={sessionUser} updates={updates} investments={investments} />} />
          <Route path='/products/:productId/edit' element={<EditForm products={products} />} />
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