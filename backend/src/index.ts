
import express from 'express';
import cors from 'cors';
import path from 'path';
import db from './db';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API routes
app.get('/api/jobs', async (req, res) => {
  const jobs = await db('jobs').select('*');
  res.json(jobs);
});

app.get('/api/jobs/:id', async (req, res) => {
  const { id } = req.params;
  const job = await db('jobs').where({ id }).first();
  if (job) {
    res.json(job);
  } else {
    res.status(404).send('Job not found');
  }
});

app.post('/api/jobs', async (req, res) => {
  const newJob = await db('jobs').insert(req.body).returning('*');
  res.status(201).json(newJob[0]);
});

app.put('/api/jobs/:id', async (req, res) => {
  const { id } = req.params;
  const updatedJob = await db('jobs').where({ id }).update(req.body).returning('*');
  if (updatedJob.length > 0) {
    res.json(updatedJob[0]);
  } else {
    res.status(404).send('Job not found');
  }
});

app.delete('/api/jobs/:id', async (req, res) => {
  const { id } = req.params;
  const deletedCount = await db('jobs').where({ id }).del();
  if (deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(404).send('Job not found');
  }
});

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../../dist')));

// Catch-all to serve index.html for any other request
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
