import React from 'react';
import { useParams } from 'react-router-dom';
import UserDetail from './UserDetail';


const UserDetailsPage = () => {
  const { username } = useParams();

  return (
    <div className="container">
      <h1>User Details</h1>
      <UserDetail username={username} />
    </div>
  );
};

export default UserDetailsPage;
