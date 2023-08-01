import React from 'react';
import Navbar from '../../components/NavBar/NavBar';
import ProfileData from '../../components/ProfileData/ProfileData';
import FriendsList from '../../components/FriendsList/FriendsList';
import './style/ProfilePage.css'


const ProfilePage = () => {
  return (
    <>
    <Navbar></Navbar>
    <ProfileData></ProfileData>
    </>
  );
};

export default ProfilePage;
