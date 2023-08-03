import '../assets/styles/NavBar.css'; 
import React from 'react';
import { Link } from 'react-router-dom';
import HomeButton from './HomeButton';

const Navbar = () => {
  return (
    <nav className="navbar">
      <HomeButton />
      {/* Navbar items */}
      <ul className="nav-items">
        {/* Use Link instead of anchor (a) tags */}
        <li><Link to="/Highscore">Highscore</Link></li>
        <li><Link to="/Profile">Profile</Link></li>
        <li><Link to="/Feed">Feed</Link></li>
        <li><Link to="/Logout">Logout</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
