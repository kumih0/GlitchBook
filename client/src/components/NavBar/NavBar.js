import React from 'react';
import './style/NavBar.css'; // Import the Navbar CSS file
import HomeButton from '../HomeButton/HomeButton';
const Navbar = () => {
  return (
    <nav className="navbar">
      <HomeButton></HomeButton>
      {/* Navbar items */}
      <ul className="nav-items">
        <li><a href="#">Highscore</a></li>
        <li><a href="#">Profile</a></li>
        <li><a href="#">Feed</a></li>
        <li><a href="#">Logout</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
