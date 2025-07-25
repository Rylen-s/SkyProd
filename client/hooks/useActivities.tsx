// src/hooks/useActivities.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Activity } from '../utils/types';
import { fetchActivities, addActivity } from '../services/activitiesService';
import * as svc from '../services/activitiesService';
import { FIREBASE_AUTH } from '@/firebaseConfig';

export function useActivities() {
  const qc = useQueryClient();

  const activitiesQuery = useQuery<Activity[], Error>({
    queryKey:   ['activities'],
    queryFn:    svc.fetchActivities,
    enabled:    !!FIREBASE_AUTH.currentUser, // only run once we have a user
    // you can also add staleTime, refetchOnWindowFocus, etc. here
  });
  // ← pass both the key and the function
  

  const addActivityMutation = useMutation<Activity, Error, string>({
    // 1) mutationFn property, takes a string and returns Promise<Activity>
    mutationFn: (description: string) => svc.addActivity(description),

    // 2) onSuccess invalidates with the object overload
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['activities'] });
    },
  });

  return {
    ...activitiesQuery,
    addActivity: addActivityMutation,
  };
}
