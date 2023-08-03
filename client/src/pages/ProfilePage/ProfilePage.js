import React from 'react';
import { Navbar, ProfileData, FriendsList, Post, PostForm } from '../../components';
import { useQuery } from '@apollo/client';
import { GET_ME, GET_USER } from '../../utils/queries';
import { useParams, Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import './style/ProfilePage.css';

const ProfilePage = () => {
  return (
    <div className="profile-page-container">
      <Navbar />
      <div className="content-container">
        <div className="profile-data-container">
          <ProfileData />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;