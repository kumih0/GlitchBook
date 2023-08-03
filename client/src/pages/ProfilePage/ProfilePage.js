import React from 'react';
import Navbar from '../../components/NavBar/NavBar';
import ProfileData from '../../components/ProfileData/ProfileData';
import Comment from '../../components/Comments/CommentForm';
import Post from '../../components/Posts/PostForm';
import './style/ProfilePage.css';

const ProfilePage = () => {
  return (
    <div className="profile-page-container">
      <Navbar />
      <div className="content-container">
        <div className="profile-data-container">
          <ProfileData />
        </div>
        <div className="comment-container">
          <Comment />
        </div>
        <div className="post-container">
          <Post />
      </div>
    </div>
    </div>
  );
};



export default ProfilePage;