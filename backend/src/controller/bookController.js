import Book from "../model/Book.js";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const getAllBook = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).populate("author", "name");
    res.json(books);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).send("Server error");
  }
};

export const getBookById = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid book id" });
    }

    const book = await Book.findById(req.params.id).populate("author", "name");
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    console.error("Error fetching book by id:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const editBook = async (req, res) => {
  try {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) return res.status(401).json({ message: "No token provided" });

    const token = jwt.verify(tokenHeader.split(" ")[1], process.env.JWT_SECRET);
    const userId = token._id || token.id || token.userId;

    const { title, genre, content } = req.body;
    if (!title || !genre) return res.status(400).json({ message: "Missing title or genre" });

    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid book id" });
    }

    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.author.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    book.title = title.trim();
    book.genre = genre.trim();
    book.content = content?.trim() ?? "";
    await book.save();

    res.status(200).json(book);
  } catch (err) {
    console.error("Error editing book:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const addBook = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id || decoded.id || decoded.userId;

    const { title, genre, content } = req.body;
    if (!title || !genre) return res.status(400).json({ message: "Missing title or genre" });

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const book = await Book.create({
      title: title.trim(),
      genre: genre.trim(),
      content: content?.trim() ?? "",
      author: userId,
      imageUrl,
    });

    return res.status(201).json(book);
  } catch (err) {
    console.error("Error adding book:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid book id" });
    }

    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const tokenUserId = req.user?._id || req.user?.id || req.user?.userId;

    if (!tokenUserId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const isOwner = book.author?.toString() === tokenUserId;
    const isAdmin = req.user?.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (book.imageUrl) {
      const imgPath = path.join(process.cwd(), book.imageUrl.replace(/^\//, ""));
      fs.unlink(imgPath, (err) => {
        if (err) console.warn("Image not deleted:", err.message);
      });
    }

    await book.deleteOne();
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("Error deleting book:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteAllBook = async (req, res) => {
  try {
    const result = await Book.deleteMany();
    res.json(result);
  } catch (err) {
    console.error("Error deleting books:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyBooks = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id || req.user?.userId;

    if (!userId) {
      return res.status(400).json({ message: "Invalid token payload" });
    }

    const books = await Book.find({ author: userId }).populate("author", "name");

    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserBooks = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const books = await Book.find({ author: userId }).populate("author", "name");
    res.json(books);
  } catch (err) {
    console.error("Error fetching user books:", err);
    res.status(500).json({ message: "Server error" });
  }
};
