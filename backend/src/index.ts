
import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import db from './db';

const app = express();
const port = process.env.PORT || 3001;

// Basic Middleware
app.use(cors());
app.use(express.json());

// --- API Routes ---
const apiRouter = express.Router();

// All API endpoints will be relative to /api
apiRouter.get('/jobs', async (req: Request, res: Response) => {
  const jobs = await db('jobs').select('*');
  res.json(jobs);
});

apiRouter.get('/jobs/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const job = await db('jobs').where({ id }).first();
  if (job) {
    res.json(job);
  } else {
    res.status(404).send('Job not found');
  }
});

apiRouter.post('/jobs', async (req: Request, res: Response) => {
  const newJob = await db('jobs').insert(req.body).returning('*');
  res.status(201).json(newJob[0]);
});

apiRouter.put('/jobs/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedJob = await db('jobs').where({ id }).update(req.body).returning('*');
  if (updatedJob.length > 0) {
    res.json(updatedJob[0]);
  } else {
    res.status(404).send('Job not found');
  }
});

apiRouter.delete('/jobs/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedCount = await db('jobs').where({ id }).del();
  if (deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(404).send('Job not found');
  }
});

// Mount the API router
app.use('/api', apiRouter);

// --- Frontend Serving ---

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../../dist')));

// Catch-all to serve index.html for any other non-api, non-file request
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
