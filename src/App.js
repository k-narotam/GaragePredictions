import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, BrowserRouter} from "react-router-dom";

import DashboardNew from './pages/DashboardNew';
import About from "./pages/About";
import Feedback from "./pages/Feedback";
// import Map from "./pages/Map";
import Settings from './pages/Settings';
import TrendsPage from './pages/TrendsPage.js';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ChangePasswordEmail from './pages/ChangePasswordEmail';
import ChangePasswordNew from './pages/ChangePasswordNew';
import Verify from './pages/Verify';

function App() {
  return (

    <BrowserRouter >
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" exact element = {<SignUp/>}/>
      <Route path="/forgot_password" exact element = {<ChangePasswordEmail/>}/>
      <Route path="/recover_password" exact element = {<ChangePasswordNew/>}>
        <Route path="*" element={<ChangePasswordNew />} />
      </Route>
      <Route path="/home" exact element = {<DashboardNew/>}/>
      <Route path="/about" exact element={<About/>} />
      <Route path="/feedback" exact element={<Feedback/>} />
      {/* <Route path="/map" exact element={<Map/>} /> */}
      <Route path="/settings" exact element={<Settings/>} />
      <Route path="/trends" exact element={<TrendsPage/>} />
      <Route path="/verify" exact element={<Verify/>}>
        <Route path="*" element={<Verify/>} />
      </Route>
    </Routes>

  </BrowserRouter>
  );
}

export default App;