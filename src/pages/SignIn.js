import React, { useState, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'
import Image from '../components/logo.png'
import AlertLogin from '../components/AlertLogin';

const theme = createTheme();

export default function SignInSide() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    // function validateForm() {

    //     return email.length > 0 && password.length > 0;

    // }
  const handleSubmit = (event) => {
    event.preventDefault();
    // api stuff
    axios.post(global.config.host + "/login",
      {"email": (email.toLowerCase()), "password": password},
      {withCredentials: true}
      )
      .then(response => {
        if (response.data.error === '') {
          window.location.href = '/home';

          if (rememberMe) {
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
          }

        } else {
          setAlertContent(response.data.error);
          setAlert(true);
          console.log("error");
        }
      });


    };

  useEffect(() => {
    if (localStorage.getItem('email') && localStorage.getItem('password')) {
      setEmail(localStorage.getItem('email'));
      setPassword(localStorage.getItem('password'));
      setRememberMe(true);
      localStorage.clear();
    }
  }, [email, password]);

  return (
    <ThemeProvider theme={theme}>
     <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />

        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{

            backgroundImage: `url(${Image})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
          <Avatar sx={{ m: 1, bgcolor: '#c79632' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
       
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value = {email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value = {password}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <div>
            {alert ? <AlertLogin severity='error' error={alertContent}/> : <></> }
            </div>
            <Grid container>
              <Grid item xs>
                <Link href="/forgot_password" variant="body2">
                  {"Forgot password?"}
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
</ThemeProvider>
  );
}
