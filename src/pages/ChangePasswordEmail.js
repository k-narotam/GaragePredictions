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
// import Image from '../components/logo.png'

const theme = createTheme();

export default function ChangePasswordEmail() {

    const [email, setEmail] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post(global.config.host + "/confirm_email", {"email": email})
        .then(response => {
            if (response.data.error === '') {
                window.location.href = '/change_password_new';
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
                Password Recovery
              </Typography>
              <Typography component="body1" variant="h9">
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
                >
                  Reset your Password
                </Button>


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
