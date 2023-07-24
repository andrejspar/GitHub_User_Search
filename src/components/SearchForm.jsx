import React, { useState } from 'react';
import './SearchForm.css';

const SearchForm = ({ onSearch, onReset }) => {
  const [username, setUsername] = useState('');

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(username);
  };

  const handleReset = () => {
    setUsername('');
    onReset();
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={handleChange}
        placeholder="Upiši GitHub username"
        className="search-input"
      />
      <button type="submit" className="search-button">
        Pretraži
      </button>
      <button type="button" onClick={handleReset} className="search-button">
        Reset
      </button>
    </form>
  );
};

export default SearchForm;
