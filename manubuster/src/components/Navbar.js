import '../style/Navbar.css';
import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box,Button } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { theme } from '../helpers/consts';
import { Link, Navigate } from 'react-router-dom';
import GamepadIcon from '@mui/icons-material/Gamepad';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { getSessionInfo, deleteSessionInfo } from '../helpers/helpers';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material';
import { Badge } from '@mui/icons-material';
import MailIcon from '@mui/icons-material/Mail';

function Navbar() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [avatarChar, setAvatarChar] = useState('');
	const [username, setUsername] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		const sessionInfo = getSessionInfo();
		if(sessionInfo){
			setIsLoggedIn(sessionInfo.token);
			setUsername(sessionInfo.name ?? '');
			if(username)
				setAvatarChar(username.charAt(0).toUpperCase());
		}
	}, []);

	const handleLogout = () => {
		deleteSessionInfo();
		navigate(0);
	};

	const notificationsLabel = (count) => {
		if (count === 0) {
			return 'no notifications';
		  }
		  if (count > 99) {
			return 'more than 99 notifications';
		  }
		  return `${count} notifications`;
	};

  	return (
		<ThemeProvider theme={theme}>
			<AppBar position="static">
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				<Box sx={{display: 'flex'}}>
					<Typography variant="h6" className='logo'>
					MANUBUSTER
					</Typography>
					<div hidden={!isLoggedIn}>
					<Link to='/games'>
					<Button variant='contained' startIcon={<GamepadIcon/>} sx={{marginLeft: "50px"}} color="warning">GAMES</Button>
					</Link>
					<Link to='/myGames'>
					<Button variant='contained' startIcon={<SmartToyIcon/>} sx={{marginLeft: "20px"}} color="warning">MY GAMES</Button>
					</Link>
					</div>
				</Box>
				<div hidden={isLoggedIn}>
				<Box sx={{display: 'flex'}}>
					<Link to='/login'>
					<Button variant='contained' startIcon={<LoginIcon/>} className='btn' color="warning" >LOGIN</Button>
					</Link>
					<Link to='/signup'>
					<Button variant='contained' startIcon={<AppRegistrationIcon/>} sx={{marginLeft: "25px"}} className='btn' color="warning" >REGISTER</Button>
					</Link>
				</Box>
				</div>
				<div hidden={!isLoggedIn}>
				<Box sx={{display: 'flex'}}>
					{/* <Button variant='contained' color="warning">
						<Badge color="primary" variant="dot">
        					<AppRegistrationIcon />
      					</Badge>
					</Button> */}
					<Button variant='contained' sx={{ marginLeft: "25px" }} onClick={handleLogout} startIcon={<LogoutIcon/>} className='btn' color="warning" >LOGOUT</Button>
					<Avatar sx={{ bgcolor: deepOrange[500], marginLeft: "25px" }}>{avatarChar}</Avatar>
					<Typography variant="h6" sx={{ marginLeft: "10px" }}>{username}</Typography>
				</Box>
				</div>
		</Toolbar>
			</AppBar>
		</ThemeProvider>
  	);
}
export default Navbar;

