import express from 'express';
import User from '../model/User.js';
import { authenticateRole } from '../middleware/jwt.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.cookie('userRole', user.role, { httpOnly: true });
    res.status(200).json({ message: 'Login successful', userRole: user.role });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/admin', authenticateRole('Admin'), async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const newUser = new User({ username, password, role: 'Admin' });
    await newUser.save();
    res.status(201).json({ message: 'Admin user created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating admin user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/manager', authenticateRole('Admin'), async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const newUser = new User({ username, password, role: 'Manager' });
    await newUser.save();
    res.status(201).json({ message: 'Manager user created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating manager user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/regular', authenticateRole('Admin', 'Manager'), async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const newUser = new User({ username, password, role: 'Regular User' });
    await newUser.save();
    res.status(201).json({ message: 'Regular user created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating regular user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
