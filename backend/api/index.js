import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import createUserRouter from './routes/createUser.js';
import loginRouter from './routes/login.js';

dotenv.config();

const app = express();

// Enable CORS before routes
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// API routes
app.use('/api/createUser', createUserRouter);
app.use('/api/login', loginRouter);

// Start server
app.listen(4000, () => {
  console.log('Backend running on port 4000');
});
