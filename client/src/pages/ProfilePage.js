import '../assets/styles/ProfilePage.css';
import React from 'react';
import NavBar from '../components/NavBar';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import FriendsList from '../components/FriendsList';

import { useQuery } from '@apollo/client';
import { GET_ME, GET_USER } from '../utils/queries';
import { useParams, Navigate } from 'react-router-dom';
import Auth from '../utils/auth';


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
    <div className="flex-row justify-center mb-3">
      <NavBar />

          <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
            Viewing {userParam ? `${user.username}'s` : 'your'} profile.
          </h2>
          <div className="profile-data-container">
            <div className="username">
              Username: {user.username}
            </div>
            <div className="email">
              Email: {user.email}
            </div>
            <FriendsList />

          {!userParam && (
            <div className="col-12 col-md-10 mb-3 p-3">
              <PostForm />
            </div>
          )}
          <div className="col-12 col-md-10 mb-5">
            <PostList
              posts={user.posts}
              title={`${user.username}'s posts...`}
              showTitle={false}
              showUsername={false}
            />
          </div>
        </div>
    </div>
  );
};

export default ProfilePage;