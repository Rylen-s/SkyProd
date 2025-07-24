// src/hooks/useActivities.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Activity } from '../utils/types';
import { fetchActivities, addActivity } from '../services/activitiesService';
import * as svc from '../services/activitiesService';

export function useActivities() {
  const qc = useQueryClient();

  // ← pass both the key and the function
  const activitiesQuery = useQuery<Activity[], Error>({
    queryKey: ['activities'],
    queryFn:  fetchActivities,
  });
  

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
