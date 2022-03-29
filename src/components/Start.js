import React, { useState } from "react";

import Button from "react-bootstrap/Button";

import "./Start.css";

export default function Start() {
  function redirectLogin() {
    window.location.href = '/login';
  }

  function redirectRegister() {
    window.location.href = '/register';
  }

  return (

    <div>
        <Button
        className = "start-button"
        color = '#eab039' 
        block size="lg" 
        type="submit" 
        onClick={redirectLogin}>
          Login
        </Button>

        <Button
        className = "start-button"
        color = '#eab039'
        block size="lg"
        type="submit"
        onClick={redirectRegister}>
            No account? Register
        </Button>
    </div>
  );

}
