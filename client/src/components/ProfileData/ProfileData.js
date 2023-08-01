import React from 'react';
import './style/ProfileData.css';
import UserScore from '../UserScore/UserScore';
import FriendsList from '../FriendsList/FriendsList';
import Auth from '../../utils/auth';

const ProfileData = () => {
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  const user = token ? Auth.getProfile().data.email : null;
  console.log(user);
  return (
    <div className="profile-data">
      <div className="profile-label">Profile</div>
      <div className="profile-container">
        {/* Profile Picture */}
        <div className="profile-picture">
        <img
            src="https://media.discordapp.net/attachments/1086145365008461885/1135750642883899433/Banana_Man.png?width=675&height=675" // Replace with the actual image path
            alt="Profile"
            style={{ width: '150px', height: '150px' }}
          />
          {/* Your Profile Picture JSX Content */}
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