import '../style/App.css';
import {Routes, Route} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSessionInfo } from '../helpers/helpers';
import Login from './userManagement/Login';
import Navbar from './Navbar';
import Games from './games/Games';  
import MyGames from './games/MyGames';  
import Signup from './userManagement/Signup';
import Recover from './userManagement/Recover';
import Home from './Home';

function App() {
  const [userToken, setUserToken] = useState('');
  useEffect(() => {
    const sessionInfo = getSessionInfo();
    if(sessionInfo && sessionInfo.userToken)
      setUserToken(getSessionInfo(sessionInfo.userToken));
  }, []);

  return (
    <div className="App">
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
		      <Route path='/games' element={<Games/>}/>
		      <Route path='/myGames' element={<MyGames/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/recoverPassword' element={<Recover/>}/>
        </Routes>
      </div>
  );
}

export default App;
