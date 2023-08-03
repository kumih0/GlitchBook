import React from 'react';
import './style/ProfileData.css';

const ProfileData = ({ user = {} }) => {

  return (
    <div className="profile-data">
      <div className="profile-label">Profile</div>
      <div className="profile-container">
        <div className="profile-picture">
          <img
            src="./img/BananaMan.png"
            alt="Profile"
            style={{ width: '150px', height: '150px' }}
          />
        </div>

        <div className="user-info">
          <div className="username">
            User Name: {user.username}
          </div>
          <div className="email">
            Email: {user.email}
          </div>
        </div>

        {/* <div className="badges">
          {user.badges.map((badge) => (
            <div className="badge" key={badge._id}>
              <h5>{badge.name}</h5>
              <p>{badge.description}</p>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}

export default ProfileData;