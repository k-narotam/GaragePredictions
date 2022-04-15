import React from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Navbar from '../components/Navbar';
import Title from "../components/Title";
import Image from '../components/cars.png';


const mdTheme = createTheme();

function DashboardContent() {

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Navbar/>
    
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            backgroundImage: `url(${Image})`
          }}
        >
        
          <Toolbar />
          
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={28} md={22} lg={12}>
                <Paper
                  sx={{
                    backgroundColor: "white",
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 170,
                  }}
                  
                >
                <Title>We hope our app has been helpful in predicting UCF garage capacity! We aim to help you plan accordingly where to park based on the days you need to attend campus. This helps save time knowing the specific garage to head to upon arrival. We also offer mobile app support and continuously strive to improve our features. We would love to hear your insights and how you use our app! We are Group 17, Super Amazing Garage Predictions!</Title>
                 
                </Paper>
              </Grid>
              

              
  
            </Grid>
            
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}