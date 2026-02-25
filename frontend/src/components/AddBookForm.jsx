import { useState } from 'react';

function AddBookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, author }); // simulate adding book
    setTitle('');
    setAuthor('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" />
      <button type="submit">Add Book</button>
    </form>
  );
}

export default AddBookForm;
