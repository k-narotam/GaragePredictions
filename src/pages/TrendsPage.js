import React from 'react';
import Navbar from '../components/Navbar';
import FutureTrends from '../components/FutureTrends';
import CssBaseline from '@mui/material/CssBaseline';
const TrendsPage = () =>
{
    return(
      <div>
        <CssBaseline />
        <Navbar/>

        <FutureTrends />
      </div>
    );
};
export default TrendsPage;