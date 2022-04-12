import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes, Navigate, Switch, BrowserRouter} from "react-router-dom";

import DashboardNew from './pages/DashboardNew';
import About from "./pages/About";
import Feedback from "./pages/Feedback";
import Map from "./pages/Map";
import Settings from './pages/Settings';
import TrendsPage from './pages/TrendsPage.js';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ChangePasswordEmail from './pages/ChangePasswordEmail';
import ChangePasswordNew from './pages/ChangePasswordNew';
import Delete from './pages/Delete';

function App() {
  return (

    <BrowserRouter >
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" exact element = {<SignUp/>}/>
      <Route path="/change_password_email" exact element = {<ChangePasswordEmail/>}/>
      <Route path="/change_password_new" exact element = {<ChangePasswordNew/>}/>
      <Route path="/home" exact element = {<DashboardNew/>}/>
      <Route path="/about" exact element={<About/>} />
      <Route path="/feedback" exact element={<Feedback/>} />
      <Route path="/map" exact element={<Map/>} />
      <Route path="/settings" exact element={<Settings/>} />
      <Route path="/trends" exact element={<TrendsPage/>} />
      <Route path="/delete" exact element={<Delete/>} />
    </Routes>

  </BrowserRouter>
  );
}

export default App;