import '../assets/styles/FriendsList.css'; 
import React from 'react';

const FriendsList = ({friends = []}) => {

  return (
    <div className="friends-list">
      {friends && friends.map((friend) => (
        <div key={friend.id} className="friend-item">
          <img src={friend.avatar} alt="friend avatar" />
          <p>{friend.username}</p>
        </div>
      ))}
    </div>
  );
};

export default FriendsList;
