import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Garage Predictions</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/map" className="nav-link">Map</Link>
          </li>
          <li className="navbar-item">
          <Link to="/about" className="nav-link">About Us</Link>
          </li>
          <li className="navbar-item">
          <Link to="/feedback" className="nav-link">Feedback</Link>
          </li>
          <li className="navbar-item">
          <Link to="/settings" className="nav-link">Settings</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}