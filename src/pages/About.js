import React, { useState } from "react";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
// import Link from '@mui/material/Link';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import Navbar from '../components/Navbar';
import CurrentGarageStats from '../components/CurrentGarageStats';
// import Favorites from '../components/Favorites';
import FavoritesNew from '../components/FavoritesNew';

// import TrendsPage from './TrendsPage';
import TrendsButton from '../components/TrendsButton';
// import Title from '../components/Title';
import Title from "../components/Title";
import Image from '../components/cars.png';
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar >
        <Navbar/>
        </AppBar>
    
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