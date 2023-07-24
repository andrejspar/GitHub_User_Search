import React from 'react';
import { Link } from 'react-router-dom';
import "./UserCard.css";

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <img src={user.avatar_url} alt={user.login} />
      <h2>{user.login}</h2>
      <Link to={`/user/${user.login}`}>View More</Link>
    </div>
  );
};

export default UserCard;
