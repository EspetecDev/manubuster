import '../style/App.css';
import {Routes, Route, Navigate} from 'react-router-dom';
import Login from './userManagement/Login';
import Navbar from './Navbar';
import Games from './games/Games';  
import MyGames from './games/MyGames';  
import Signup from './userManagement/Signup';
import Recover from './userManagement/Recover';
import { getSessionInfo } from '../helpers/helpers';
import MyBookings from './games/MyBookings';

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
          <Route path='/' element={<Login/>}/>
		      <Route path='/games' element={
            <ProtectedRoute>
              <Games/>
            </ProtectedRoute>
          }/>
		      <Route path='/myGames' element={<ProtectedRoute><MyGames/></ProtectedRoute>}/>
          <Route path='/myBookings' element={<ProtectedRoute><MyBookings/></ProtectedRoute>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/recoverPassword' element={<Recover/>}/>
        </Routes>
      </div>
  );
}

export default App;
