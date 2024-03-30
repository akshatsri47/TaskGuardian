// routes/protectedRoutes.js

import express from 'express';
import { authenticateRole } from '../middleware/authenticate.js';

const router = express.Router();

// Route accessible only to Admins
router.get('/adminOnly', authenticateRole('Admin'), (req, res) => {
  // Log route access
  console.log('Admin route accessed');
  res.json({ message: 'Admin route accessed successfully' });
});

// Route accessible to Managers and Admins
router.get('/managerAccess', authenticateRole('Manager'), (req, res) => {
  // Log route access
  console.log('Manager route accessed');
  res.json({ message: 'Manager route accessed successfully' });
});

// Route accessible to Regular Users, Managers, and Admins
router.get('/regularAccess', authenticateRole('Regular'), (req, res) => {
  // Log route access
  console.log('Regular route accessed');
  res.json({ message: 'Regular route accessed successfully' });
});

export default router;
