import {useState} from 'react';
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
import axios from 'axios';
import { CircularProgress } from '@mui/material';

const theme = createTheme();

export default function Recover(){
    const [showError, setShowError] = useState('');
  	const [loading, setLoading] = useState(false);
  	const [tokenURL, setTokenURL] = useState('');

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
            url: process.env.REACT_APP_BACKEND_URI+'/users/recoverPassword',
            data:{
                email: data.get('email'),
            }}).then( (req, res) => {
                setTokenURL(req.data.debug);
                setLoading(false);
            })
            .catch((err) => {
                setShowError(err.response.data.reason);
                setLoading(false);
                console.log(err);
            });
    }
    
    
    return ( 
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
            Recover Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
              {loading ? <CircularProgress color='secondary' size={25}/> : 'Recover'}
            </Button>
            

          </Box>
        </Box>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href={tokenURL} >
                  {tokenURL}
                </Link>
              </Grid>
            </Grid>
      </Container>
    );
}
 