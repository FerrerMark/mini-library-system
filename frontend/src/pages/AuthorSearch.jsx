import { useEffect, useMemo, useState } from 'react';
import Header from '../components/Header';
import { bookApi } from '../api';
import '../css/authors.css';

const AuthorSearch = () => {
  const [authors, setAuthors] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAuthors = async () => {
      try {
        const response = await bookApi.getAll();
        const bookList = Array.isArray(response.data) ? response.data : [];
        const names = bookList
          .map((book) => book.author?.name)
          .filter(Boolean);

        setAuthors([...new Set(names)]);
      } catch (error) {
        console.error('Failed to load authors:', error);
        setAuthors([]);
      } finally {
        setLoading(false);
      }
    };

    loadAuthors();
  }, []);

  const filteredAuthors = useMemo(() => {
    if (!query.trim()) return authors;

    return authors.filter((authorName) =>
      authorName.toLowerCase().includes(query.toLowerCase())
    );
  }, [authors, query]);

  return (
    <div className="authors-page">
      <Header />
      <div className="authors">
        <h2>Author Search</h2>
        <div className="author-search-input">
          <input
            type="text"
            placeholder="Search authors..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        {loading ? (
          <p>Loading authors...</p>
        ) : (
          <ul className="author-list">
            {filteredAuthors.length > 0 ? (
              filteredAuthors.map((authorName) => (
                <li key={authorName}>{authorName}</li>
              ))
            ) : (
              <li>No authors found.</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AuthorSearch;
