import '../style/App.css';
import {Routes, Route} from 'react-router-dom';
import { createContext } from 'react';
import Login from './userManagement/Login';
import Navbar from './Navbar';
import Games from './Games';
import Signup from './userManagement/Signup';

const UserState = {
  userToken: '',
  userLoggedIn : false
}
export const UserContext = createContext(UserState);

function App() {
  return (
    <div className="App">
        <Navbar/>
        <Routes>
          <Route path='/' element={<Games/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/recoverPassword' element={<Recover/>}/>
        </Routes>
      </div>
  );
}

export default App;
