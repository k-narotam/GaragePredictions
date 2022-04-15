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

export default function ChangePasswordNew() {

    const [new_password, setPassword] = useState("");

    const [confirm_password, confirmPassword] = useState("");
    const confirmToken = window.location.pathname.split('/')[2];

    function comparePassword(pass1, pass2) {

      return (new_password === confirm_password) && new_password !== '' && confirm_password !== '';
    }


    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post(global.config.host + "/recover_password/" + confirmToken, {"new_password": new_password})
        .then(response => {
            if (response.data.error === '') {
              console.log("success");
                window.location.href = '/login';
            }
        });
    };


    return (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />

            <Box
              sx={{

                marginTop: '20vh',
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
              <Typography variant="h9">
                Please enter your new password
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt:3}}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      // margin="normal"
                      required
                      fullWidth
                      type = "password"
                      id="outlined-password-input"
                      label="New Password"
                      name="newpassword"
                      value={new_password}
                      autoComplete="newpassword"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      type = "password"
                      id="confirmpassword"
                      label="Confirm Password"
                      name="confirmpassword"
                      value={confirm_password}
                      autoComplete="confirmpassword"
                      onChange={(e) => confirmPassword(e.target.value)}
                    />
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={!comparePassword(new_password, confirm_password)}
                >
                  Change your Password
                </Button>
              </Box>

                <Grid container justifyContent="center">
                  <Grid item>
                    <Link href="/login" variant="body2">
                        Remember your Password? Sign In
                    </Link>
                  </Grid>
                </Grid>
              </Box>
              </Container>
        </ThemeProvider>
    );
}
