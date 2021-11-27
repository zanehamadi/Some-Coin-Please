
import { Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Home from './components/Home'

function App() {
  return (
    <Routes>
      <Route path='/'  element={<Home/>}/>
      <Route path='/login' element={<LoginForm />}/>

    </Routes>
  );
}

export default App;