import bcrypt from 'bcrypt';
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  try {
    const { username, password, currentScore, fastestTypingSpeed, averageTypingSpeed } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const client = await clientPromise;
    const db = client.db('vocab_game');
    const users = db.collection('users');

    // Check if username already exists
    const existingUser = await users.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already taken' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
      username,
      passwordHash,
      currentScore: currentScore || 0,
      fastestTypingSpeed: fastestTypingSpeed || 0,
      averageTypingSpeed: averageTypingSpeed || 0
    };

    const result = await users.insertOne(user);

    res.status(201).json({ message: 'User created successfully', userId: result.insertedId });
  } catch (error) {
    console.error('User creation failed:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}