import React, { useState } from "react";

import axios from 'axios'

import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";

import "./Login.css";

export default function Register() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [errorMessage, setError] = useState("abc");

  const [errorVisible, setErrorVisible] = useState("none");

  function validateForm() {

    return email.length > 0 && password.length > 0;

  }

  function handleSubmit(event) {

    event.preventDefault();

    // api stuff
    axios.post("http://" + window.location.hostname + ":9090/register", {"email": email, "password": password})
      .then(response => {
        if (response.data.error == '') {
          window.location.href = '/login';
        } else {
          setErrorVisible("block");
          setError(response.data.error);
        }
      });
  }

  return (

    <div className="Register">

      <div style={{"display": errorVisible}}>
        {errorMessage}
      </div>

      <Form onSubmit={handleSubmit}>

        <Form.Group size="lg" controlId="email">

          <Form.Label>Email</Form.Label>

          <Form.Control

            autoFocus

            type="email"

            value={email}

            onChange={(e) => setEmail(e.target.value)}

          />

        </Form.Group>

        <Form.Group size="lg" controlId="password">

          <Form.Label>Password</Form.Label>

          <Form.Control

            type="password"

            value={password}

            onChange={(e) => setPassword(e.target.value)}

          />

        </Form.Group>

        <Button
        color = '#eab039'
        block size="lg"
        type="submit"
        disabled={!validateForm()}>
          Register
        </Button>


      </Form>

    </div>

  );

}
