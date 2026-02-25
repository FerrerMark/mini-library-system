import { useState } from 'react';
import '../css/searchBar.css'; 

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search books or authors..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <button onClick={() => onSearch(searchTerm)}>Search</button>
    </div>
  );
};

export default SearchBar;