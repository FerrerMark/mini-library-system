import { useState } from 'react';


const EditModal = ({ book, onClose, onUpdate }) => {
  const [title, setTitle] = useState(book.title);
  const [genre, setGenre] = useState(book.genre);

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
        body: JSON.stringify({ title, genre }),
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
        <input value={title} onChange={e => setTitle(e.target.value)} />
        <input value={genre} onChange={e => setGenre(e.target.value)} />
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditModal;