import {useState} from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CircularProgress, LinearProgress } from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const theme = createTheme();

function getButtonContent(state) {
    var content = '';
    if(state === 'success')
        content = `Success`;
    else
        content = 'Sign Up';
    return content;
} 

export default function SignUp() {
    const [showError, setShowError] = useState('');
    const [loading, setLoading] = useState(false);
    const [btnState, setBtnState] = useState('notInteracted');

    const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true);
    axios({
        method: 'post',
        headers: {
            "Access-Control-Allow-Origin":"*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        },
        url: process.env.REACT_APP_BACKEND_URI+'/users',
        data:{
            name: data.get('userName'),
            email: data.get('email'),
            password: data.get('password'),
        }}).then( (req, res) => {
            setBtnState('success');
            setLoading(false);
        })
        .catch((err) => {
            if(err.response.data.reason)
                setShowError(err.response.data.reason);
            setLoading(false);
            setBtnState('error');
            console.log(err);
        });
    };

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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="userName"
                  required
                  fullWidth
                  id="userName"
                  label="Username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Typography  variant='caption' color='secondary' hidden={!showError}>{showError}</Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? <CircularProgress color='secondary' size={25}/> : getButtonContent(btnState)} {btnState === 'success' ? <DoneAllIcon/> : ''}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" >
                  Already have an account? Log In
                </Link>
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" >
                  Already have an account? Log In
                </Link>
              </Grid>
              <Grid item>
                <Link to="/recoverPassword" >
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
