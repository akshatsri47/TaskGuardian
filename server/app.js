import express from 'express';
import bodyParser from 'body-parser';
import ConnectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/useroute.js';
import adminRoutes from './routes/adminroute.js';
import managerRoutes from './routes/manager.js';
import login from './routes/try.js';
import  check from './routes/testroute.js';
import cors from 'cors'; 

import Task from './routes/task.js';
const app = express();
ConnectDB();
app.use(cors());
// Middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(cookieParser());

// Sample route for testing authentication
app.use('/', userRoutes);
app.use('/admin', adminRoutes);
app.use('/manager', managerRoutes);
app.use('/try',login);
app.use('/protected',check);
app.use('/task',Task);

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
