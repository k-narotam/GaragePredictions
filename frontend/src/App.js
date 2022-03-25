import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'

function App() {
  const [getMessage, setGetMessage] = useState({})

  useEffect(()=>{
    axios.get('http://localhost:3006/time').then(response => {
      console.log("SUCCESS", response)
      setGetMessage(response)
    }).catch(error => {
      console.log(error)
    })

  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Test</h1>
        <div>{getMessage.status === 200 ?
          <h3>Time: {getMessage.data.time}</h3>
          :
          <h3>LOADING</h3>}</div>
      </header>
    </div>
  );
}

export default App;
