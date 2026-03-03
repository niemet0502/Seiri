import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { Tracking, TrackingHistory } from '../types';

const STORAGE_KEY_PREFIX = 'trackings_project_';

interface CreateTrackingData {
  title: string;
  description?: string;
  target: number;
  dueDate?: string;
}

export const useTrackingStorage = (projectId: number) => {
  const [data, setData] = useState<Tracking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const storageKey = `${STORAGE_KEY_PREFIX}${projectId}`;

  const loadTrackings = useCallback(async () => {
    try {
      setIsLoading(true);
      const stored = await AsyncStorage.getItem(storageKey);
      if (stored) {
        setData(JSON.parse(stored));
      } else {
        setData([]);
      }
    } catch (error) {
      console.error('Failed to load trackings:', error);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, [storageKey]);

  useEffect(() => {
    loadTrackings();
  }, [loadTrackings]);

  const saveTrackings = useCallback(
    async (trackings: Tracking[]) => {
      try {
        await AsyncStorage.setItem(storageKey, JSON.stringify(trackings));
        setData(trackings);
      } catch (error) {
        console.error('Failed to save trackings:', error);
      }
    },
    [storageKey],
  );

  const createTracking = useCallback(
    async (input: CreateTrackingData) => {
      const newTracking: Tracking = {
        id: Date.now(),
        title: input.title,
        description: input.description,
        target: input.target,
        balance: 0,
        dueDate: input.dueDate ? new Date(input.dueDate) : undefined,
        createdAt: new Date(),
        history: [],
      };
      const updated = [...data, newTracking];
      await saveTrackings(updated);
      return newTracking;
    },
    [data, saveTrackings],
  );

  const updateTracking = useCallback(
    async (id: number, changes: Partial<Tracking>) => {
      const updated = data.map((t) => (t.id === id ? { ...t, ...changes } : t));
      await saveTrackings(updated);
    },
    [data, saveTrackings],
  );

  const addTransaction = useCallback(
    async (trackingId: number, amount: number) => {
      const updated = data.map((t) => {
        if (t.id !== trackingId) return t;
        const entry: TrackingHistory = {
          id: Date.now(),
          amount,
          date: new Date(),
        };
        return {
          ...t,
          balance: Number(t.balance) + amount,
          history: [...(t.history || []), entry],
        };
      });
      await saveTrackings(updated);
    },
    [data, saveTrackings],
  );

  const deleteTracking = useCallback(
    async (id: number) => {
      const updated = data.filter((t) => t.id !== id);
      await saveTrackings(updated);
    },
    [data, saveTrackings],
  );

  const getTracking = useCallback(
    (id: number) => data.find((t) => t.id === id),
    [data],
  );

  return {
    data,
    isLoading,
    refetch: loadTrackings,
    createTracking,
    updateTracking,
    addTransaction,
    deleteTracking,
    getTracking,
  };
};

