import React, { useState } from "react";
import Navbar from '../components/Navbar';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import emailjs from '@emailjs/browser';

export default function Feedback () {
  const [email, setEmail] = useState("");

  const [name, setName] = useState("");

  const [message, setMessage] = useState("");

  function validateForm(unit) {

    return unit.length < 0;

  }

  const handleEmail = (event) => {
    event.preventDefault();

    if (email.length <= 0 || name.length <= 0 || message.length <= 0){
      return;
    }
    var templateParams = {
      name: name,
      email: email,
      message: message
    };

    emailjs.send('garage-prediction-email', 'feedback-email-template', templateParams, 'f1PCaYkQUptAotcdK')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

    return(
      <div>
        <Navbar/>
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          onSubmit={handleEmail}>
            <Typography variant="h4" color="primary" m={2}>Send us a message!</Typography>
            <TextField
                  margin="normal"
                  required
                  id="name"
                  label="Name"
                  name="name"
                  value = {name}
                  error={validateForm(name)}
                  helperText={validateForm(name) ? "Name is required" : ""}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="email"
                  autoFocus
                  style={{width: 'auto'}}
                />
            <TextField
                margin="normal"
                required
                name="email"
                value = {email}
                label="Email"
                type="email"
                id="email"
                error={validateForm(email)}
                helperText={validateForm(email) ? "Email is required" : ""}
                onChange={(e) => setEmail(e.target.value)}
                style={{width: 'auto'}}
              />
            <TextField
                variant="outlined"
                label=" "
                placeholder="Message"
                InputLabelProps={{shrink: false}}
                multiline
                rows={15}
                error={validateForm(message)}
                helperText={validateForm(message) ? "Message is required" : ""}
                onChange={(e) => setMessage(e.target.value)}
                style={{width: '50%'}}
              />
            <Box component="form" m={2}>
              <Button
                  type="submit"
                  variant="contained"
                  fullWidth>
                  Send message
              </Button>
            </Box>
        </Grid>
      </div>
    );
};