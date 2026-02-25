import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
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
        const uniqueAuthors = new Map();

        bookList.forEach((book) => {
          const author = book.author;
          const authorName = author?.name?.trim();
          if (!authorName) return;

          const authorId = author?._id || `name:${authorName.toLowerCase()}`;
          const existing = uniqueAuthors.get(authorId);

          if (existing) {
            existing.bookCount += 1;
            return;
          }

          uniqueAuthors.set(authorId, {
            id: authorId,
            name: authorName,
            bookCount: 1,
          });
        });

        setAuthors(Array.from(uniqueAuthors.values()));
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

    return authors.filter((author) =>
      author.name.toLowerCase().includes(query.toLowerCase())
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
              filteredAuthors.map((author) => (
                <li key={author.id}>
                  <Link className="author-link" to={`/authors/${encodeURIComponent(author.id)}`}>
                    {author.name}
                  </Link>
                  <span className="author-book-count"> ({author.bookCount})</span>
                </li>
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
