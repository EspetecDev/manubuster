import '../style/App.css';
import {Routes, Route} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSessionInfo } from '../helpers/helpers';
import Login from './userManagement/Login';
import Navbar from './Navbar';
import Games from './Games';  
import Signup from './userManagement/Signup';
import Recover from './userManagement/Recover';

function App() {
  const [userToken, setUserToken] = useState(getSessionInfo().userToken  ?? '');

  return (
    <div className="App">
        <Navbar/>
        <Routes>
          <Route path='/' element={userToken ? <Games/> : <Login/>}/>
		  <Route path='/games' element={<Games/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/recoverPassword' element={<Recover/>}/>
        </Routes>
      </div>
  );
}

export default App;
