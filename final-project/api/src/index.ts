import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sendMagicLink } from './auth';
import { connectToMongo } from './lib/mongo';
import { User } from './models/User';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectToMongo();

// Test health route
app.get('/api/health', (_req, res) => {
  res.json({ status: 'OK', message: 'Server is running!' });
});

// Root route
app.get('/', (_req, res) => {
  res.send('API is running 🚀');
});

// Send magic link
app.post('/api/send-magic-link', async (req, res) => {
  const { email } = req.body;
  try {
    const data = await sendMagicLink(email);
    res.json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Test route to add user
app.post('/api/test-create-user', async (req, res) => {
  try {
    const user = await User.create({
      email: 'test@example.com',
      name: 'Test User',
    });
    res.json({ message: 'User created', user });
  } catch (err) {
    res.status(500).json({ error: 'Error creating user', details: err });
  }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
