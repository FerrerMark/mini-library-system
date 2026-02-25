import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { bookApi } from '../api';
import '../css/authors.css';

const AuthorProfile = () => {
  const { authorId } = useParams();
  const decodedAuthorId = decodeURIComponent(authorId || '');

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const response = await bookApi.getAll();
        setBooks(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Failed to load author profile:', error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  const authoredBooks = useMemo(() => {
    return books.filter((book) => {
      const author = book.author;
      if (!author?.name) return false;

      if (author._id === decodedAuthorId) return true;

      const fallbackId = `name:${author.name.toLowerCase()}`;
      return fallbackId === decodedAuthorId;
    });
  }, [books, decodedAuthorId]);

  const author = authoredBooks[0]?.author;

  return (
    <div className="authors-page">
      <Header />
      <div className="authors author-profile">
        {loading ? (
          <p>Loading profile...</p>
        ) : authoredBooks.length === 0 ? (
          <>
            <h2>Author not found</h2>
            <p>We could not find this author profile.</p>
            <Link className="author-back-link" to="/authors">
              Back to author search
            </Link>
          </>
        ) : (
          <>
            <h2>{author?.name || 'Author Profile'}</h2>
            {author?.email ? <p className="author-meta">Email: {author.email}</p> : null}
            <p className="author-meta">Books in library: {authoredBooks.length}</p>

            <h3>Books</h3>
            <ul className="author-book-list">
              {authoredBooks.map((book) => (
                <li key={book._id}>
                  <strong>{book.title}</strong>
                  {book.genre ? <span> - {book.genre}</span> : null}
                </li>
              ))}
            </ul>

            <Link className="author-back-link" to="/authors">
              Back to author search
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthorProfile;
