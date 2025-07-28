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

connectToMongo();

// Test route
app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

const PORT = process.env.PORT || 4000;
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.post('/api/send-magic-link', async (req, res) => {
  const { email } = req.body;
  try {
    const data = await sendMagicLink(email);
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.get('/', (_req, res) => {
  res.send('API running');
});

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});

// test route to add a user
app.post('/api/test-create-user', async (req, res) => {
  try {
    const user = await User.create({
      email: 'test@example.com',
      name: 'Test User'
    });

    res.json({ message: 'User created', user });
  } catch (err) {
    res.status(500).json({ error: 'Error creating user', details: err });
  }
}); 