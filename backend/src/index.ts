
import express from 'express';
import cors from 'cors';
import path from 'path';
import db from './db';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../../dist')));

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Get all jobs
app.get('/api/jobs', async (req, res) => {
  const jobs = await db('jobs').select('*');
  res.json(jobs);
});

// Get a single job
app.get('/api/jobs/:id', async (req, res) => {
  const { id } = req.params;
  const job = await db('jobs').where({ id }).first();
  if (job) {
    res.json(job);
  } else {
    res.status(404).send('Job not found');
  }
});

// Create a new job
app.post('/api/jobs', async (req, res) => {
  const newJob = await db('jobs').insert(req.body).returning('*');
  res.status(201).json(newJob[0]);
});

// Update a job
app.put('/api/jobs/:id', async (req, res) => {
  const { id } = req.params;
  const updatedJob = await db('jobs').where({ id }).update(req.body).returning('*');
  if (updatedJob.length > 0) {
    res.json(updatedJob[0]);
  } else {
    res.status(404).send('Job not found');
  }
});

// Delete a job
app.delete('/api/jobs/:id', async (req, res) => {
  const { id } = req.params;
  const deletedCount = await db('jobs').where({ id }).del();
  if (deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(404).send('Job not found');
  }
});

// Catch-all to serve index.html for any other request
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
