import { useState } from 'react';


const EditModal = ({ book, onClose, onUpdate }) => {
  const [title, setTitle] = useState(book.title);
  const [genre, setGenre] = useState(book.genre);
  const [content, setContent] = useState(book.content || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/books/edit/${book._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, genre, content }),
      });

      if (!res.ok) throw new Error('Update failed');

      const updatedBook = await res.json();
      onUpdate(updatedBook);
      onClose();           
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="EditModal">
      <form onSubmit={handleSubmit}>
        <h3>Edit Book</h3>

        <label htmlFor="edit-book-title">Title</label>
        <input
          id="edit-book-title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter book title"
        />

        <label htmlFor="edit-book-genre">Genre</label>
        <input
          id="edit-book-genre"
          value={genre}
          onChange={e => setGenre(e.target.value)}
          placeholder="Enter genre"
        />

        <label htmlFor="edit-book-content">Content</label>
        <textarea
          id="edit-book-content"
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Update book content..."
          rows={6}
        />

        <div className="edit-modal-actions">
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditModal;
