import { useState } from 'react';

function AddBookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, author, content }); // simulate adding book
    setTitle('');
    setAuthor('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Book content" />
      <button type="submit">Add Book</button>
    </form>
  );
}

export default AddBookForm;
