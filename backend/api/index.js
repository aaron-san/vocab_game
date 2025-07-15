import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import createUserRouter from './user/create.js';
import loginRouter from './auth/login.js';

dotenv.config();

const app = express();

// Enable CORS before routes
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// API routes
app.use('/api/createUser', createUserRouter);
app.use('/api/login', loginRouter);

// Start server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
