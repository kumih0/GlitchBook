import React from 'react';
import '../assets/styles/'; 

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
