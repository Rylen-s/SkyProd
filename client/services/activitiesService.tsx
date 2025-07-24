import api from './api';
import type { Activity } from '../utils/types';

export async function fetchActivities(): Promise<Activity[]> {
  const res = await api.get<Activity[]>('/activities');
  return res.data;
}

export async function addActivity(description: string): Promise<Activity> {
  const res = await api.post<Activity>('/activities', { description });
  return res.data;
}