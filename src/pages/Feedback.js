import React, { useState } from "react";
import Navbar from '../components/Navbar';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Feedback () {
  const [email, setEmail] = useState("");

  const [name, setName] = useState("");

  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email);
 
    // Email self with feedback
  };

    return(
      <div>
        <Navbar/>
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          onSubmit={handleSubmit}>
              <Typography variant="h5" color="primary">Send us a message!</Typography>
              <TextField
                    margin="normal"
                    required
                    id="name"
                    label="Name"
                    name="name"
                    value = {name}
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
                  onChange={(e) => setMessage(e.target.value)}
                  style={{width: '50%'}}
                />
            <Box component="form">
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