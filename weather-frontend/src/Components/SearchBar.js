import React from 'react';

const SearchBar = ({ location, setLocation, getWeather }) => {
  return (
    <div>
      <input 
        type="text" 
        value={location} 
        onChange={(e) => setLocation(e.target.value)} 
        placeholder="Enter location"
      />
      <button onClick={getWeather}>Get Weather</button>
    </div>
  );
};

export default SearchBar;
