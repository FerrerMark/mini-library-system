import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import GenreFilter from './GenreFilter';
import '../css/Booklist.css';
import Loading from './Loading';

function BookList() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [genre, setGenre] = useState('');
  const [loading, setLoading] = useState(true); // loading state
  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/api/books`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBooks(data);
          setFilteredBooks(data);
          setLoading(false);
        } else {
          setBooks([]);
          setFilteredBooks([]);
          setLoading(false);
          console.error('Unexpected books data:', data);
        }
      })
      .catch((err) => {
        console.error('Failed to load books:', err);
        setLoading(false);
      });
  }, [API_URL, token]);

  useEffect(() => {
    let filtered = books;

    if (genre) {
      filtered = filtered.filter((book) => book.genre === genre);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (book.author?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBooks(filtered);
  }, [books, searchTerm, genre]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleGenreChange = (selectedGenre) => {
    setGenre(selectedGenre);
  };

  return (
    <div className="books">
      <h2>Books</h2>
      <div className="filters">
        <SearchBar onSearch={handleSearch} />
        <GenreFilter onGenreChange={handleGenreChange} />
      </div>

      {loading ? (
        <Loading message="Hang tight — the domain is starting up. Estimated wait: 1–45s." />
      ) : (
        <div className="BookList">
          {filteredBooks.map((book) => (
            <div
              key={book._id}
              className="book-item"
              style={{
                backgroundImage: `url(${API_URL}${book.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <span className="book-title">{book.title}</span>
              <span className="book-author">{book.author?.name || 'Unknown Author'}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookList;
