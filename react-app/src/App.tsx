import { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import Home from './components/Home'
import * as sessionActions from "./store/session";
import { CurrentUser, State } from 'interfaces';
import Nav from "components/Nav";
import ProductForm from "components/ProductForm";
// import { createTheme} from '@mui/material/styles';



// const theme = createTheme({
//   palette: {
//     neutral: {
//       main: '#F3BA2C',
//       contrastText: '#fff'
//     },
//   },
// })



// declare module '@mui/material/styles'{
//   interface Palette{
//     neutral: Palette['primary'];
//   }
//   interface PaletteOptions {
//     neutral?: PaletteOptions['primary'];
//   }
// }


function App() {
  
  const dispatch:any = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser:CurrentUser = useSelector((state: State) => state.session.user);
  

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return ( isLoaded ?
    <>
    <Nav sessionUser={sessionUser}/>
      <Routes>
        <Route path='/'  element={<Home/>} />
        <Route path='/postproduct' element={<ProductForm/>} />
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