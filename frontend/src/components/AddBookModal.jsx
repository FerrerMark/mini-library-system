import { useState } from "react";
import "../css/addBookModal.css";

const AddBookModal = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState(null);
  const URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("genre", genre);
    if (image) formData.append("image", image);

    try {
      const res = await fetch(`${URL}/api/books`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.ok) {
        onClose();
      } else {
        const text = await res.text(); 
        try {
          const json = JSON.parse(text);
          console.error("Error adding book:", json.message);
        } catch {
          console.error("Server error:", text);
        }
      }
    } catch (err) {
      console.error("Request failed:", err.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add a New Book</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Genre:</label>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button type="submit">Add Book</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;
