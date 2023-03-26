import '../style/Navbar.css';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box,Button } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { theme } from '../helpers/consts';
import { Link } from 'react-router-dom';
import GamepadIcon from '@mui/icons-material/Gamepad';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { UserContext } from './App';

function Navbar() {
	const [isLoggedIn, setIsLoggedIn] = useState(UserContext.isLoggedIn ?? false);
  	return (
		<div className="a">
		<ThemeProvider theme={theme}>
			<AppBar position="static">
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				<Box sx={{display: 'flex'}}>
					<Typography variant="h6" className='logo'>
					MANUBUSTER
					</Typography>
					<Link to='/'>
					<Button variant='contained' startIcon={<GamepadIcon/>} sx={{marginLeft: "50px"}} color="warning">GAMES</Button>
					</Link>
				</Box>
				<div hidden={isLoggedIn}>
					<Link to='/login'>
					<Button variant='contained' startIcon={<LoginIcon/>} className='btn' color="warning" >LOGIN</Button>
					</Link>
					<Link to='/signup'>
					<Button variant='contained' startIcon={<AppRegistrationIcon/>} sx={{marginLeft: "25px"}} className='btn' color="warning" >REGISTER</Button>
					</Link>
				</div>
			</Toolbar>
			</AppBar>
		</ThemeProvider>
		</div>
  	);
}
export default Navbar;

