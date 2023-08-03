import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import ProfileData from '../../components/ProfileData/ProfileData';
import Post from '../../components/Posts/PostForm';
import PostList from '../../components/Posts/PostList';
import { useQuery } from '@apollo/client';
import { GET_ME, GET_USER } from '../../utils/queries';
import { useParams, Navigate } from 'react-router-dom';
import Auth from '../../utils/auth';
import './style/ProfilePage.css';

const ProfilePage = () => {

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? GET_USER : GET_ME, {
    variables: { username: userParam }
  });

  const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div className="profile-page-container">
      <NavBar />
      <div className="content-container">
        <div className="profile-data-container">
          <ProfileData />
        </div>
        <div className="comment-container">
        </div>
        <div className="post-container">
          <Post />
      </div>
    </div>
    </div>
  );
};



export default ProfilePage;