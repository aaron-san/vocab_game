// import bcrypt from 'bcrypt';
// import clientPromise from '../lib/mongodb.js';

// export default async function handler(req, res) {
//   try {
//     const client = await clientPromise;
//     const db = client.db('vocab_game');
//     const users = db.collection('users');
//     const sessions = db.collection('sessions');

//     // Hash password
//     const passwordHash = await bcrypt.hash('superSecure123', 10);

//     // Insert user
//     const user = {
//       username: 'typemaster23',
//       passwordHash,
//       currentScore: 1840,
//       fastestTypingSpeed: 124.6,
//       averageTypingSpeed: 98.2
//     };
//     const userInsert = await users.insertOne(user);

//     // Insert session
//     const session = {
//       userId: userInsert.insertedId,
//       timestamp: new Date(),
//       durationSeconds: 300,
//       wordsTyped: 490,
//       typingSpeed: 98.0,
//       score: 1820
//     };
//     await sessions.insertOne(session);

//     // Respond
//     res.status(200).json({ message: 'User and session inserted successfully' });
//   } catch (error) {
//     console.error('Error inserting data:', error);
//     res.status(500).json({ error: 'Failed to insert data' });
//   }
// }