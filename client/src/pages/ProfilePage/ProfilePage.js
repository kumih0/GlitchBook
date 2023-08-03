import React from 'react';
import { Navbar, ProfileData, FriendsList, Post, PostForm } from '../../components';
import { useQuery } from '@apollo/client';
import { GET_ME, GET_USER } from '../../utils/queries';
import { useParams, Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import './style/ProfilePage.css';

const ProfilePage = () => {

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? GET_USER : GET_ME, {
    variables: { username: userParam }
  });

  const user = data?.me || data?.user || {};

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