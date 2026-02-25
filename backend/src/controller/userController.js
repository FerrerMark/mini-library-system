import User from "../model/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const addUser = async (req, res) => {
  try {
    const data = req.body;

    if (Array.isArray(data)) {
      const usersWithHashed = await Promise.all(
        data.map(async user => ({
          ...user,
          password: await bcrypt.hash(user.password, 10),
        }))
      );
      const users = await User.insertMany(usersWithHashed);
      return res.status(200).json(users);
    }
    const { name, email, password } = data;
    const role = data.role || 'user';
    if (!password) return res.status(400).json({ message: 'Password is required' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword, role });

    await Author.create({
      _id: user._id,
      name: user.name,
      bio: 'Newly registered user',
    });

    res.status(200).json(user);

  } catch (error) {
    console.error("Error adding user/author:", error);
    res.status(500).json({ message: error.message });
  }
};


export const editUser = async (req, res) => {
    try {
        const { name, email,role } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { name, email, role });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteAllUser = async (req, res) => {
    try {
        const user = await User.deleteMany();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}