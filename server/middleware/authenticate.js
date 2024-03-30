// middleware/authenticate.js

export const authenticateRole = (requiredRole) => {
    return (req, res, next) => {
      try {
        // Check if the user has the required role stored in the cookie
        const userRole = req.cookies.userRole;
  
        if (!userRole) {
          return res.status(401).json({ message: 'Unauthorized: Missing user role cookie' });
        }
  
        // Check if the user has the required role
        if (userRole !== requiredRole) {
          return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
        }
  
        // User has the required role, proceed to the next middleware
        next();
      } catch (error) {
        console.error('Error authenticating user role:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    };
};
