// useQuests.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Activity } from '../utils/types';
import { fetchActivities, addActivity } from '../services/activitiesService';
import * as svc from '../services/activitiesService';
import { FIREBASE_AUTH } from '@/firebaseConfig';
import { api } from '../api'
import {Quest}from '../utils/types'


const qc = useQueryClient();

const complete = useMutation({
  mutationFn: async (id: string) => api.delete(`/quests/${id}`),
  onMutate: async (id: string) => {
    await qc.cancelQueries({ queryKey: ['quests'] });
    const prev = qc.getQueryData<Quest[]>(['quests']) || [];
    qc.setQueryData<Quest[]>(['quests'], prev.filter(q => q.id !== id));
    return { prev };
  },
  onError: (_err, _id, ctx) => {
    if (ctx?.prev) qc.setQueryData(['quests'], ctx.prev); // rollback
  },
  onSettled: () => {
    qc.invalidateQueries({ queryKey: ['quests'] });       // re-sync with server
  },
});