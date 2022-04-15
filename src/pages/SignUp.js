import React, { useState } from "react";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import AlertRegister from '../components/AlertRegister';


const theme = createTheme();

export default function SignUp() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [pass, setPass] = useState(false);
    function validateForm() {

        return email.length > 0 && password.length > 5;

    }
  const handleSubmit = (event) => {
    event.preventDefault();
    // api stuff
    setAlert(false);
    axios.post(global.config.host + "/register", {"email": email, "password": password})
      .then(response => {

        let redirect = false;

        if (response.data.error === '') {
          setAlertContent("You have successfully registered. Please check your email to verify your account.");
          setAlert(true);
          setPass(true);
          redirect = true;
          } 
        else {
          setAlertContent(response.data.error);
          setAlert(true);
        }

        if (redirect) {
          setTimeout(() => {
            window.location.href = '/login';
          }, 5000);
        }
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
          <Avatar sx={{ m: 1, bgcolor: '#c79632' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up

          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>


              <Grid item xs={12}>


                <TextField
                  required
                  fullWidth
                  type = "email"
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!validateForm()}
            >
              Sign Up
            </Button>
            <div>
            {alert ? <AlertRegister severity='error' error={alertContent} pass={pass}/> : <></> }
            </div>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
