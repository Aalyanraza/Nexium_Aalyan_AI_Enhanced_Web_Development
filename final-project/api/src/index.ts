import express, { Request } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { sendMagicLink } from './auth';
import { connectToMongo } from './lib/mongo';
import { User } from './models/User';

dotenv.config();

const upload = multer({ storage: multer.memoryStorage() });
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
connectToMongo();

// Health Check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'OK', message: 'Server is running!' });
});

// Root
app.get('/', (_req, res) => {
  res.send('API is running 🚀');
});

// Magic Link Auth
app.post('/api/send-magic-link', async (req, res) => {
  const { email } = req.body;
  try {
    const data = await sendMagicLink(email);
    res.json({ success: true, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(400).json({ success: false, error: message });
  }
});

// Test User Creation
app.post('/api/test-create-user', async (_req, res) => {
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

// Extend Request type for multer
interface MulterRequest extends Request {
  file: Express.Multer.File;
}

// Tailor Resume Endpoint
app.post('/api/tailor-resume', upload.single('resume'), (req: Request, res) => {
  const multerReq = req as MulterRequest;
  const { jobDescription, userId } = multerReq.body;

  if (!jobDescription || !multerReq.file) {
    return res.status(400).json({ error: 'Missing resume or job description' });
  }

  // Mock response
  res.json({
    suggestions: {
      summary: 'Received the job description successfully.',
      improvements: [],
      skillsToAdd: [],
      experienceRewrites: [],
      keywords: [],
      echoedJobDescription: jobDescription,
      userId,
    },
  });
});

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
