import express, { Request } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import axios from 'axios';
import FormData from 'form-data';
import pdfParse from 'pdf-parse';

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


app.post('/api/tailor-resume', upload.single('resume'), async (req: Request, res) => {
  const multerReq = req as MulterRequest;
  const { jobDescription, userId } = multerReq.body;

  if (!jobDescription || !multerReq.file) {
    return res.status(400).json({ error: 'Missing resume or job description' });
  }

  try {
    // Extract text from PDF
    const resumeBuffer = Buffer.from(multerReq.file.buffer);
    const pdfData = await pdfParse(resumeBuffer);
    const resumeText = pdfData.text;

    // Build form for n8n
    const form = new FormData();
    form.append('resumeText', resumeText);
    form.append('jobDescription', jobDescription);
    form.append('userId', userId);

    const n8nEndpoint =
      process.env.N8N_WEBHOOK_URL || 'https://aalyan.app.n8n.cloud/webhook/tailor-resume';

    // Send data to n8n
    const response = await axios.post(n8nEndpoint, form, {
      headers: form.getHeaders(),
    });

    // Log response from n8n
    console.log('🔗 n8n Response:\n', JSON.stringify(response.data, null, 2));


    // Forward response from n8n
    res.json(response.data);
  } catch (err) {
    console.error('❌ Error in /api/tailor-resume:', err);
    res.status(500).json({ error: 'Failed to process resume with AI' });
  }
});



// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
