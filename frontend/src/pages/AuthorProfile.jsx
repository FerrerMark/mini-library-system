import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AddBtn from '../components/moreBtn';
import Header from '../components/Header';
import { bookApi } from '../api';
import '../css/authors.css';

const getAuthorDetails = (author) => {
  if (!author) return null;

  if (typeof author === 'string') {
    return {
      id: author,
      name: '',
      email: '',
    };
  }

  const name = typeof author.name === 'string' ? author.name.trim() : '';
  const email = typeof author.email === 'string' ? author.email.trim() : '';
  const directId = author._id ? String(author._id) : '';
  const fallbackId = name ? `name:${name.toLowerCase()}` : '';

  return {
    id: directId || fallbackId,
    name,
    email,
  };
};

const AuthorProfile = () => {
  const { authorId = '' } = useParams();
  const profileId = String(authorId).trim();

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
      const details = getAuthorDetails(book.author);
      return Boolean(details?.id) && details.id === profileId;
    });
  }, [books, profileId]);

  const authorDetails = getAuthorDetails(authoredBooks[0]?.author);

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
            <h2>{authorDetails?.name || 'Author Profile'}</h2>
            {authorDetails?.email ? <p className="author-meta">Email: {authorDetails.email}</p> : null}
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
      <AddBtn />
    </div>
  );
};

export default AuthorProfile;
