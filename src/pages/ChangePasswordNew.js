import React, { useState } from "react";
//import * as React from 'react';
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
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'
import Image from '../components/logo.png'

const theme = createTheme();

export default function ChangePasswordNew() {

    const [new_password, setPassword] = useState("");
    
    const [errorMessage, setError] = useState("abc");

    const [errorVisible, setErrorVisible] = useState("none");


    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post("https://group17poos-api.herokuapp.com/change_password", {"new_password": new_password})
        .then(response => {
            if (response.data.error === '') {
                window.location.href = '/login';
            } else {
                setErrorVisible("block");
                setError(response.data.error);
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

                Enter your email below fgfgf reset your password
                
                <Grid container justifyContent="flex-end">
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

