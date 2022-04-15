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
import axios from 'axios'
import Alert from '@mui/material/Alert';

const theme = createTheme();

export default function ChangePasswordEmail() {

    const [email, setEmail] = useState("");
    const [alert, setAlert] = useState(false);
    const [pass, setPass] = useState(false);
    const [alertContent, setAlertContent] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post(global.config.host + "/send_recovery", {"email": email})
        .then(response => {

            let redirect = false;

            if (response.data.error === '') {
                setPass(true);
                setAlert(true);
                setAlertContent("Recovery email sent. Please check your email to reset your password.");
                redirect = true;
              
            }
            else {
                setAlertContent(response.data.error);
                setAlert(true);
            }

            if (redirect === true) {
              console.log("redirecting");
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
                marginTop: '25vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Avatar sx={{ m: 1, bgcolor: '#c79632' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Password Recovery
              </Typography>
              <Typography variant="h9">
                Enter your email below to reset your password
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt:3}}>
                <Grid container spacing={2}>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      type = "required"
                      id="email"
                      label="Email Address"
                      name="email"
                      value={email}
                      autoComplete="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>

                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={!email}
                >
                  Reset your Password
                </Button>
                <div>
                {alert ? 
                  pass ? 
                  <Alert severity='success'
                  >{alertContent}</Alert>
                  
                  :
                  <Alert severity='error'>{alertContent}</Alert>
                : <></> 
                }
                </div>

                <Grid container justifyContent="center">
                  <Grid item>
                    <Link href="/login" variant="body2">
                        Remember your Password? Sign In
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      );
    }
