import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import AddBtn from '../components/moreBtn';
import { bookApi } from '../api';
import '../css/bookInfo.css';

const BookInfo = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const loadBook = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await bookApi.getById(id);
        setBook(response.data);
      } catch (err) {
        console.error('Failed to load book details:', err);
        setError('Unable to load book information.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadBook();
    }
  }, [id]);

  return (
    <div className="book-info-page">
      <Header />
      <div className="book-info-content">
        <Link className="book-info-back" to="/mybooks">
          Back to My Books
        </Link>

        {loading ? (
          <p>Loading book info...</p>
        ) : error ? (
          <p>{error}</p>
        ) : !book ? (
          <p>Book not found.</p>
        ) : (
          <>
          <div className="book-info-container">
            <div className="book-info-card">
              {book.imageUrl ? (
                <img src={`${API_URL}${book.imageUrl}`} alt={book.title} className="book-info-image" />
              ) : (
                <div className="book-info-image-placeholder">No Cover</div>
              )}
              <h2>{book.title}</h2>
              <p><strong>Author:</strong> {book.author?.name || 'Unknown Author'}</p>
              <p><strong>Genre:</strong> {book.genre || 'No genre set'}</p>
              <p>
                <strong>Context:</strong> This book is part of your library collection.
              </p>
            </div>
            <div className="book-content-box">
              <h3>Book Content</h3>
              <p>{book.content?.trim() ? book.content : 'No content added yet.'}</p>
            </div>
          </div>  
          </>
          
        )}
      </div>
      <AddBtn />
    </div>
  );
};

export default BookInfo;
