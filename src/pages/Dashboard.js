import React from 'react';
import Navbar from '../components/Navbar';
import CurrentGarageStats from '../components/CurrentGarageStats';
import FutureTrends from '../components/FutureTrends';
import TrendsPage from './TrendsPage';
import SpecificPrediction from './SpecifiedPrediction';
import Favorites from '../components/Favorites';

function viewPreds() {
  <TrendsPage/>
  
  window.location.href = '/trends';
}


const Dashboard = () =>
{
    return(
      
      <div>
      <Navbar/>
      
      Dashboard
      <CurrentGarageStats/>
      <button onClick={viewPreds}>View Trends</button>  
      <br></br>
      <br></br>
      <Favorites/>

      
      
      </div>
    );
};
export default Dashboard;