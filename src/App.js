import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes, Navigate, Switch, BrowserRouter} from "react-router-dom";

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import About from "./pages/About";
import Feedback from "./pages/Feedback";
import Map from "./pages/Map";
import Settings from './pages/Settings';
import StartPage from './pages/StartPage';
import Navbar from './components/Navbar';
import TrendsPage from './pages/TrendsPage.js';

function App() {
  return (

    <BrowserRouter >
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/login" exact element = {<LoginPage/>}/>
      <Route path="/register" exact element = {<RegisterPage/>}/>
      <Route path="/home" exact element = {<Dashboard/>}/>
      <Route path="/about" exact element={<About/>} />
      <Route path="/feedback" exact element={<Feedback/>} />
      <Route path="/map" exact element={<Map/>} />
      <Route path="/settings" exact element={<Settings/>} />
      <Route path="/trends" exact element={<TrendsPage/>} />
    </Routes>

  </BrowserRouter>
  );
}

export default App;