import React from 'react';
import './style/ProfileData.css';
// import UserScore from '../UserScore/UserScore';
// import FriendsList from '../FriendsList/FriendsList';
import Auth from '../../utils/auth';

const ProfileData = () => {


  return (
    <div className="profile-data">
      <div className="profile-label">Profile</div>
      <div className="profile-container">
        <div className="profile-picture">
        <img
            src="#"
            alt="Profile"
            style={{ width: '150px', height: '150px' }}
          />
        </div>

        {/* Username and Email */}
        <div className="user-info">
          <div className="username">
            User Name: BananaMan420
            {/* User's Username JSX Content */}
          </div>
          <div className="email">
          Email: BananaMan420@email.com
            {/* User's Email JSX Content */}
          </div>
        </div>

        {/* Achievements */}
        
        <div className="achievements">
        </div>
      </div>
      <UserScore></UserScore>
      <FriendsList></FriendsList>
    </div>
    
  );
}

export default ProfileData;