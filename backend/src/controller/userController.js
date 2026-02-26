import User from "../model/User.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("name email role createdAt updatedAt");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({ message: "Email is already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: "user",
    });

    res.status(201).json(sanitizeUser(user));
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const editUser = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const requesterId = req.user?._id || req.user?.id || req.user?.userId;
    const isSelfEdit = requesterId === req.params.id;
    const isAdmin = req.user?.role === "admin";

    if (!isSelfEdit && !isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }

    const { name, email } = req.body;
    const update = {};

    if (name) {
      update.name = name.trim();
    }

    if (email) {
      const normalizedEmail = email.trim().toLowerCase();
      const existingUser = await User.findOne({ email: normalizedEmail, _id: { $ne: req.params.id } });
      if (existingUser) {
        return res.status(409).json({ message: "Email is already in use" });
      }
      update.email = normalizedEmail;
    }

    if (Object.keys(update).length === 0) {
      return res.status(400).json({ message: "No fields provided for update" });
    }

    const user = await User.findByIdAndUpdate(req.params.id, update, { new: true })
      .select("name email role createdAt updatedAt");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const requesterId = req.user?._id || req.user?.id || req.user?.userId;
    const isSelfDelete = requesterId === req.params.id;
    const isAdmin = req.user?.role === "admin";

    if (!isSelfDelete && !isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }

    const user = await User.findByIdAndDelete(req.params.id).select("name email role");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteAllUser = async (req, res) => {
  try {
    const result = await User.deleteMany();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
