import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../services/ApiClient';
import { CreateProject, EditProject, FeatureEnum } from '../types';

// Query Keys
export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  list: (feature: FeatureEnum, includeArchived: boolean) =>
    [...projectKeys.lists(), feature, includeArchived] as const,
  details: () => [...projectKeys.all, 'detail'] as const,
  detail: (id: number) => [...projectKeys.details(), id] as const,
};

// Hooks
export const useProjects = (feature: FeatureEnum = FeatureEnum.Task, includeArchived: boolean = false) => {
  return useQuery({
    queryKey: projectKeys.list(feature, includeArchived),
    queryFn: () => apiClient.getProjects(feature, includeArchived),
  });
};

export const useProject = (projectId: number) => {
  return useQuery({
    queryKey: projectKeys.detail(projectId),
    queryFn: () => apiClient.getProject(projectId),
    enabled: !!projectId,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProject) => apiClient.createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: EditProject) => apiClient.updateProject(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(variables.id) });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: number) => apiClient.deleteProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
  });
};
