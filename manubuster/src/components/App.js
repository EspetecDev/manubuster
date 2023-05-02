import '../style/App.css';
import {Routes, Route, Navigate} from 'react-router-dom';
import Login from './userManagement/Login';
import Navbar from './Navbar';
import Games from './games/Games';  
import MyGames from './games/MyGames';  
import Signup from './userManagement/Signup';
import Recover from './userManagement/Recover';
import Home from './Home';
import { getSessionInfo } from '../helpers/helpers';

const ProtectedRoute = ({ children }) => {
  const session = getSessionInfo();
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <div className="App">
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
		      <Route path='/games' element={
            <ProtectedRoute>
              <Games/>
            </ProtectedRoute>
          }/>
		      <Route path='/myGames' element={<ProtectedRoute><MyGames/></ProtectedRoute>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/recoverPassword' element={<Recover/>}/>
        </Routes>
      </div>
  );
}

export default App;
