import {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {getSessionInfo, setSessionInfo} from '../../helpers/helpers';
import * as GAC from '../games/GameApiCalls';
import { loginUser } from '../games/GameApiCalls';

const theme = createTheme();


export default function SignIn() {
  	const [showError, setShowError] = useState('');
  	const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
      const sessionInfo = getSessionInfo();
      console.log(sessionInfo);
    },[]);

    async function handleSubmit(event) {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      setLoading(true);
      await GAC.loginUser(data.get('email'), data.get('password'))
      .then((req, res) => {
        setSessionInfo({token: req.data.token, email: data.get('email'), name: req.data.name});
        setLoading(false);
        navigate('/games');
        window.location.reload();
      })
      .catch(e => {
        setShowError(e.message);
        setLoading(false);
        console.log(e);
      });
    }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address or Username"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Grid container justifyContent={'center'}>
              <Grid item>
                <Typography  variant='caption' color='secondary' hidden={!showError}>{showError}</Typography>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? <CircularProgress color='secondary' size={25}/> : 'Log In'}
            </Button>
            
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signup" >
                  Not registered? Sign Up
                </Link>
              </Grid>
            </Grid>
            {/* <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/recoverPassword" >
                  Forgot password?
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}