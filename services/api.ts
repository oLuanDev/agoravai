
import axios from 'axios';
import { Job } from '../types';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getJobs = () => apiClient.get<Job[]>('/jobs');

export const getJobById = (id: number) => apiClient.get<Job>(`/jobs/${id}`);

export const createJob = (jobData: Omit<Job, 'id'>) => apiClient.post<Job>('/jobs', jobData);

export const updateJob = (id: number, jobData: Partial<Job>) => apiClient.put<Job>(`/jobs/${id}`, jobData);

export const deleteJob = (id: number) => apiClient.delete(`/jobs/${id}`);
