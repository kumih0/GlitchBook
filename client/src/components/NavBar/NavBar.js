import React from 'react';
import './style/NavBar.css'; // Import the Navbar CSS file
import HomeButton from '../HomeButton/HomeButton';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className="navbar">
      <HomeButton></HomeButton>
      {/* Navbar items */}
      <ul className="nav-items">
      <li><Link to="/signup">HighScores</Link></li>
        <li><Link to="/Profile">Profile</Link></li>
        <li><a href="#">Feed</a></li>
        <li><a href="#">Logout</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
