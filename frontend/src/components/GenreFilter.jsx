import { useState } from 'react';
import '../css/GenreFilter.css'; 

const GenreFilter = ({ onGenreChange }) => {
  const [genre, setGenre] = useState('');

  const handleGenreChange = (e) => {
    const value = e.target.value;
    setGenre(value);
    onGenreChange(value); 
  };

  return (
    <div className="genre-filter">
      <select value={genre} onChange={handleGenreChange}>
        <option value="">All Genres</option>
        <option value="Romance">Romance</option>
        <option value="Dystopian">Dystopian</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Literary Fiction">Literary Fiction</option>
        <option value="Mystery">Mystery</option>
        <option value="Adventure">Adventure</option>
        <option value="Historical Fiction">Historical Fiction</option>
        <option value="Magical Realism">Magical Realism</option>
        <option value="Contemporary Fiction">Contemporary Fiction</option>
        <option value="Nonfiction">Nonfiction</option>
        <option value="Memoir">Memoir</option>
        <option value="Thriller">Thriller</option>
        <option value="Sports Fiction">Sports Fiction</option>
        <option value="Psychological Thriller">Psychological Thriller</option>
        <option value="Self-Help">Self-Help</option>
        <option value="Business">Business</option>
        <option value="Technical Guide">Technical Guide</option>
        <option value="Poetry">Poetry</option>
        <option value="Political Fiction">Political Fiction</option>
        <option value="Children's Fiction">Children's Fiction</option>
        <option value="Horror">Horror</option>
        <option value="Sports Nonfiction">Sports Nonfiction</option>
        <option value="Science Nonfiction">Science Nonfiction</option>
        <option value="Nature Writing">Nature Writing</option>
        <option value="Cookbook">Cookbook</option>
        <option value="Science Fiction">Science Fiction</option>
        <option value="Inspirational Fiction">Inspirational Fiction</option>
        <option value="Crime Fiction">Crime Fiction</option>
        <option value="Health">Health</option>
        <option value="Action">Action</option>
      </select>
    </div>
  );
};

export default GenreFilter;