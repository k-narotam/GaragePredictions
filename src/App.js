import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Navbar from "./components/Navbar"
import About from "./pages/About";
import Feedback from "./pages/Feedback";
import Map from "./pages/Map";
import Settings from './pages/Settings';
import LoginPage from './pages/LoginPage';



function App() {
  return (

    //<LoginPage/>
    
    <Router>
      <div className="container">

      <Navbar />
      <br/>
      <Routes>
      <Route path="/about" exact element={<About/>} />
      <Route path="/feedback" exact element={<Feedback/>} />
      <Route path="/map" exact element={<Map/>} />
      <Route path="/settings" exact element={<Settings/>} />
      </Routes>
     
      </div>
    </Router>
    
  );
}

export default App;