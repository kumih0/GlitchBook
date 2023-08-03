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
    <div className="profile-page-container">
      <NavBar />
      <div className="content-container">
        <h2 className="bg-dark text-light header">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        <div className="profile-container">
            <div className="user-info">
              <div className="username">
                User Name: {user.username}
              </div>
              <div className="email">
                Email: {user.email}
              </div>
              <FriendsList/>
            </div>

          {!userParam && (
            <div className="post-container">
              <PostForm />
            </div>
          )}
          <div className="post-list-container">
            <PostList
              posts={user.posts}
              title={`${user.username}'s posts...`}
              showTitle={false}
              showUsername={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

 export default ProfilePage;