import Book from "../model/Book.js";
import OwnerBook from "../model/OwnerBook.js";
import jwt from "jsonwebtoken";
import fs from 'fs';
import path from 'path';

export const getAllBook = async (req, res) => {
  try {
    const books = await Book.find()
      .sort({ createdAt: -1 })
      .populate('author');
    res.json(books);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).send("Server error");
  }
};

export const editBook = async (req, res) => {
  try {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) return res.status(401).json({ message: "No token provided" });

    const token = jwt.verify(tokenHeader.split(" ")[1], process.env.JWT_SECRET);
    const userId = token._id || token.id || token.userId;

    const { title, genre } = req.body;
    if (!title || !genre) return res.status(400).json({ message: "Missing title or genre" });

    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.author.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    book.title = title;
    book.genre = genre;
    await book.save();

    res.status(200).json({ message: "Book updated successfully", book });
  } catch (err) {
    console.error("Error editing book:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const addBook = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id || decoded.id || decoded.userId;

    const { title, genre } = req.body;
    if (!title || !genre) return res.status(400).json({ message: "Missing title or genre" });

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const book = await Book.create({
      title,
      genre,
      author: userId,
      imageUrl,
    });

    return res.status(201).json(book);
  } catch (err) {
    console.error("Error adding book:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send("Book not found");

    const { userId } = req.query;
    if (!userId) return res.status(400).send("Missing userId");

    if (book.author?.toString() !== userId) {
      return res.status(403).send("Unauthorized");
    }

    if (book.imageUrl) {  
      const imgPath = path.join(process.cwd(), book.imageUrl.replace(/^\//, ''));
      fs.unlink(imgPath, (err) => {
        if (err) console.warn("Image not deleted:", err.message);
      });
    }


    await book.deleteOne();
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("Error deleting book:", err.message);
    res.status(500).send("Server error");
  }
};



export const deleteAllBook = async (req, res) => {
    try {
        const book = await Book.deleteMany();
        res.json(book);
    } catch (err) {
        console.error("Error adding book:", err);
        res.status(500).send("Server error");
    }
}

export const getMyBooks = async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({ message: "Missing userId" });
    }

    const books = await Book.find({ author: userId }).populate("author", "name");

    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


export const getUserBooks = async (req, res) => {
    try {
        const userId = req.params.id;

        const owner = await Book.findOne({ user: userId }).populate('ownedBook');

        if (!owner) {
            return res.status(404).json({ message: 'No books found for this user' });
        }

        res.json(owner.ownedBook);
    } catch (err) {
        console.error("Error fetching user books:", err);
        res.status(500).send("Server error");
    }
};