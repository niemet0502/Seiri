import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../services/ApiClient';
import { CreateTaskApi, DeleteMultipleTasksApi, EditTaskApi } from '../types';

// Query Keys
export const taskKeys = {
  all: ['tasks'] as const,
  lists: () => [...taskKeys.all, 'list'] as const,
  list: (projectId: number, showCompleted: boolean) =>
    [...taskKeys.lists(), projectId, showCompleted] as const,
  details: () => [...taskKeys.all, 'detail'] as const,
  detail: (id: number) => [...taskKeys.details(), id] as const,
};

// Hooks
export const useTasks = (projectId: number, showCompleted: boolean = true) => {
  return useQuery({
    queryKey: taskKeys.list(projectId, showCompleted),
    queryFn: () => apiClient.getTasksByProject(projectId, showCompleted),
    enabled: !!projectId,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};

export const useTask = (taskId: number) => {
  return useQuery({
    queryKey: taskKeys.detail(taskId),
    queryFn: () => apiClient.getTask(taskId),
    enabled: !!taskId,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTaskApi) => apiClient.createTask(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
      // If it's a sub-task, invalidate parent task
      if (variables.parentId) {
        queryClient.invalidateQueries({ queryKey: taskKeys.detail(Number(variables.parentId)) });
      }
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: EditTaskApi) => apiClient.updateTask(data),
    onSuccess: async (_, variables) => {
      // Immediately invalidate and refetch all task queries
      await queryClient.invalidateQueries({ 
        queryKey: taskKeys.all,
        refetchType: 'active'
      });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: number) => apiClient.deleteTask(taskId),
    onSuccess: () => {
      // Invalidate both lists and all detail queries to refresh parent tasks
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
      queryClient.invalidateQueries({ queryKey: taskKeys.details() });
    },
  });
};

export const useDeleteMultipleTasks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DeleteMultipleTasksApi) => apiClient.deleteMultipleTasks(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
    },
  });
};
