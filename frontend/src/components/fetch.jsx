import GenreFilter from '../components/GenreFilter';
import SearchBar from '../components/SearchBar';
import AddBookModal from '../components/AddBookModal';
import DeleteBtn from '../components/DeleteBtn';
import ConfirmModal from './confirmModal';
import EditBtn from '../components/EditBtn';
import EditModal from './EditModal';
import '../css/components.css';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

const MyBooks = () => {
  const [showModal, setShowModal] = useState(false);
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [loading, setLoading] = useState(true);
  const [confirmId, setConfirmId] = useState(null);
  const [editBook, setEditBook] = useState(null);

  const URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = jwtDecode(token);
    const userId = decoded._id || decoded.id || decoded.userId;
    if (!userId) return;

    fetch(`${URL}/api/books/getmybooks?userId=${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        const validBooks = Array.isArray(data) ? data : [];
        setBooks(validBooks);
        setFilteredBooks(validBooks);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching books:", err);
        setBooks([]);
        setFilteredBooks([]);
        setLoading(false);
      });
  }, [showModal, URL, editBook]);

  const filterBooks = (term, genre) => {
    let filtered = books;

    if (genre) {
      filtered = filtered.filter(book => book.genre === genre);
    }

    if (term) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(term.toLowerCase()) ||
        (book.author?.name || '').toLowerCase().includes(term.toLowerCase())
      );
    }

    setFilteredBooks(filtered);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterBooks(term, selectedGenre);
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    filterBooks(searchTerm, genre);
  };

  const confirmDelete = async () => {
    if (!confirmId) return;
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const userId = decoded._id || decoded.id || decoded.userId;

    try {
      const res = await fetch(`${URL}/api/books/${confirmId}?userId=${userId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete');

      setBooks(prev => prev.filter(book => book._id !== confirmId));
      setFilteredBooks(prev => prev.filter(book => book._id !== confirmId));
    } catch (err) {
      console.error("Failed to delete the book");
    } finally {
      setConfirmId(null); 
    }
  };

  const handleEdit = (book) => {
    setEditBook(book);
  };

  return (
    <div className="my-book body">
      <h2>My Books List</h2>
      <div className="search add">
        <SearchBar onSearch={handleSearch} />
        <button className="addBtn" onClick={() => setShowModal(true)}>Add Book</button>
      </div>
      <GenreFilter onGenreChange={handleGenreChange} />
      <div className="my-book-list book-list">
        {loading ? null : filteredBooks.length === 0 ? (
          <div className="book-item">
            <p>No books found</p>
          </div>
        ) : (
          filteredBooks.map(book => (
            <div
              className="book-item"
              key={book._id}
              style={{
                backgroundImage: `url(${URL}${book.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '20px',
              }}
            >
              <span>{book.title}</span>
              <DeleteBtn onClick={() => setConfirmId(book._id)} id={book._id} />
              <EditBtn onClick={() => handleEdit(book)} />
            </div>
          ))
        )}
      </div>
      {showModal && <AddBookModal onClose={() => setShowModal(false)} />}
      {confirmId && (
        <ConfirmModal
          message="Delete this book?"
          onConfirm={confirmDelete}
          onCancel={() => setConfirmId(null)}
        />
      )}
      {editBook && (
      <EditModal
        book={editBook}
        onClose={() => setEditBook(null)}
        onUpdate={(updatedBook) => {
          const updatedList = books.map(b => b._id === updatedBook._id ? updatedBook : b);
          setBooks(updatedList);
          setFilteredBooks(updatedList);
        }}
      />
    )}

    </div>
  );
};

export default MyBooks;
