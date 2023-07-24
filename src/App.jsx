import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SearchForm from './components/SearchForm';
import UserCard from './components/UserCard';
import UserDetail from './components/UserDetail';

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchedUser, setSearchedUser] = useState('');

  const handleSearch = async (username) => {
    try {
      const response = await fetch(`https://api.github.com/search/users?q=${username}`);
      if (response.ok) {
        const data = await response.json();
        setUsers(data.items);
        setSearchedUser(username);
      } else {
        setUsers([]);
        setSearchedUser('');
      }
    } catch (error) {
      console.error('Greška pri dohvaćanju podataka:', error);
      setUsers([]);
      setSearchedUser('');
    }
  };

  const handleReset = () => {
    setUsers([]);
    setSearchedUser('');
  };

  const handleViewMore = (username) => {
    setSearchedUser(username);
  };

  return (
    <Router>
      <div className="container">
        <h1>GitHub User Tražilica</h1>
        <SearchForm onSearch={handleSearch} onReset={handleReset} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="user-cards">
                  {users.map((user) => (
                    <UserCard
                      key={user.login}
                      user={user}
                      onViewMore={() => handleViewMore(user.login)}
                    />
                  ))}
                </div>
              </>
            }
          />
          <Route path="/user/:username" element={<UserDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
