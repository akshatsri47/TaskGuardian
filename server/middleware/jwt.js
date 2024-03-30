import jwt from 'jsonwebtoken';
import User from '../model/User.js';

export const authenticateRole = (requiredRole) => {
  return async (req, res, next) => {
    try {
      // Extract JWT token from the Authorization header
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(401).json({ message: 'Missing JWT token' });
      }

   
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: 'Invalid or expired JWT token' });
        }

        const { userId } = decoded;

        
        const user = await User.findById(userId);

        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

       
        if (!user.role || user.role !== requiredRole) {
          return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
        }
        req.user = user;

       
        next();
      });
    } catch (error) {
      console.error('Error authenticating JWT:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
};
