import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './UserDetail.css';

const UserDetail = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);

  const handleBackToSearch = () => {
    setUserData(null);
    setRepos([]);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=created&per_page=10`);

        if (userResponse.ok && reposResponse.ok) {
          const userData = await userResponse.json();
          const reposData = await reposResponse.json();
          setUserData(userData);
          setRepos(reposData);
        } else {
          setUserData(null);
          setRepos([]);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUserData(null);
        setRepos([]);
      }
    };
    fetchUserData();
  }, [username]);

  return (
    <div className="container">
      {userData ? (
        <div className="user-details">
          <img src={userData.avatar_url} alt={userData.login} className="user-avatar" />
          <div className="user-info">
            <h2>{userData.name}</h2>
            <p>Bio: {userData.bio || 'N/A'}</p>
            <p>Lokacija: {userData.location || 'N/A'}</p>
            <h3>Repos:</h3>
            <ul className="user-repos-list">
              {repos.map((repo) => (
                <li key={repo.id}>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    {repo.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <Link to="/" className="back-to-search" onClick={handleBackToSearch}>
            Nazad na pretragu
          </Link>
        </div>
      ) : (
        <p>Učitavanje...</p>
      )}
    </div>
  );
};

export default UserDetail;
