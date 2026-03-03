import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../services/ApiClient';
import { CreateTrackingApi, UpdateBalanceApi, UpdateTrackingApi } from '../types';

// Query Keys
export const trackingKeys = {
  all: ['trackings'] as const,
  lists: () => [...trackingKeys.all, 'list'] as const,
  listByProject: (projectId: number) =>
    [...trackingKeys.lists(), projectId] as const,
  details: () => [...trackingKeys.all, 'detail'] as const,
  detail: (id: number) => [...trackingKeys.details(), id] as const,
  history: (id: number) => [...trackingKeys.all, 'history', id] as const,
};

// Hooks
export const useTrackings = (projectId: number) => {
  return useQuery({
    queryKey: trackingKeys.listByProject(projectId),
    queryFn: () => apiClient.getTrackingsByProject(projectId),
    enabled: !!projectId,
  });
};

export const useTracking = (trackingId: number) => {
  return useQuery({
    queryKey: trackingKeys.detail(trackingId),
    queryFn: () => apiClient.getTracking(trackingId),
    enabled: !!trackingId,
  });
};

export const useTrackingHistory = (trackingId: number) => {
  return useQuery({
    queryKey: trackingKeys.history(trackingId),
    queryFn: () => apiClient.getTrackingHistory(trackingId),
    enabled: !!trackingId,
  });
};

export const useCreateTracking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTrackingApi) => apiClient.createTracking(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: trackingKeys.listByProject(variables.projectId),
      });
    },
  });
};

export const useUpdateTracking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateTrackingApi) => apiClient.updateTracking(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: trackingKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: trackingKeys.detail(variables.id),
      });
    },
  });
};

export const useUpdateBalance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateBalanceApi) => apiClient.updateBalance(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: trackingKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: trackingKeys.detail(variables.trackingId),
      });
      queryClient.invalidateQueries({
        queryKey: trackingKeys.history(variables.trackingId),
      });
    },
  });
};

export const useDeleteTracking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (trackingId: number) => apiClient.deleteTracking(trackingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: trackingKeys.lists() });
    },
  });
};
