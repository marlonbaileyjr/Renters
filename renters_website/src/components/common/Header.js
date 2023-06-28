import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/house (1).png';
import '../../style/header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" /> 
      </div>
      <div className="nav-div">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/signin" className="nav-link">Sign In</Link>
      </div>
    </header>
  );
};

export default Header;
