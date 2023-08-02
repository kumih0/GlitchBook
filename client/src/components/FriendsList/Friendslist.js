import React from 'react';
import './style/FriendsList.css'; // Import the FriendsList CSS file

const FriendsList = () => {
  // Sample data - you can replace this with actual data from your application
  const friendsData = [
    { id: 1, name: 'Friend 1', profilePicture: 'profile_picture_url_1.jpg' },
    { id: 2, name: 'Friend 2', profilePicture: 'profile_picture_url_2.jpg' },
    { id: 3, name: 'Friend 3', profilePicture: 'profile_picture_url_3.jpg' },
    { id: 4, name: 'Friend 4', profilePicture: 'profile_picture_url_1.jpg' },
    { id: 5, name: 'Friend 5', profilePicture: 'profile_picture_url_2.jpg' },
    { id: 6, name: 'Friend 6', profilePicture: 'profile_picture_url_3.jpg' },
    { id: 7, name: 'Friend 7', profilePicture: 'profile_picture_url_2.jpg' },
    { id: 8, name: 'Friend 8', profilePicture: 'profile_picture_url_3.jpg' },
    // Add more friends data here
  ];

  return (
    <div className="friends-list">
      {friendsData.map((friend) => (
        <div key={friend.id} className="friend-item">
          <img src={friend.profilePicture} alt={friend.name} />
          <p>{friend.name}</p>
        </div>
      ))}
    </div>
  );
};

export default FriendsList;
