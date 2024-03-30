import express from 'express';
import User from '../model/User.js';
import { authenticateRole } from '../middleware/authenticate.js';

const router = express.Router();


router.post('/', authenticateRole('Admin', 'Manager'), async (req, res) => {
  try {
    const { username, password, role } = req.body;

    
    if (role === 'Admin' && req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Forbidden: Only Admin can create Admin users' });
    }

    
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const newUser = new User({ username, password, role });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.put('/:userId', authenticateRole('Admin', 'Manager'), async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, password, role } = req.body;

    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (req.user.role !== 'Admin' && role !== user.role) {
      return res.status(403).json({ message: 'Forbidden: Only Admin can update user roles' });
    }

    user.username = username;
    user.password = password;
    user.role = role;
    await user.save();

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.delete('/:userId', authenticateRole('Admin', 'Manager'), async (req, res) => {
  try {
    const { userId } = req.params;

   
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

   
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Forbidden: Only Admin can delete users' });
    }

  
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
