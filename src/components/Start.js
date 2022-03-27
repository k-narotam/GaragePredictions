import React, { useState } from "react";

import Form from "react-bootstrap/Form";

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

    <div className="StartButtons">
        <Button 
        color = '#eab039' 
        block size="lg" 
        type="submit" 
        onClick={redirectLogin}>
          Login
        </Button>

        <Button
        color = '#eab039'
        block size="lg"
        type="submit"
        onClick={redirectRegister}>
            No account? Register
        </Button>
    </div>
  );

}
