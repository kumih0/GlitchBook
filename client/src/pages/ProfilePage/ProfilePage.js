import React from 'react';
import Navbar from '../../components/NavBar/NavBar';
import ProfileData from '../../components/ProfileData/ProfileData';
// import FriendsList from '../../components/FriendsList/FriendsList';
import Comment from '../../components/Comments/CommentForm';
// import CommentField from '../../components/Comments/CommentField'
import './style/ProfilePage.css'


const ProfilePage = () => {
  return (
    <>
    <Navbar></Navbar>
    <ProfileData></ProfileData>
    <Comment></Comment>
    </>
  );
};

export default ProfilePage;
