import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../services/ApiClient';
import { CreateNoteApi, Note } from '../types';

// Query Keys
export const noteKeys = {
  all: ['notes'] as const,
  lists: () => [...noteKeys.all, 'list'] as const,
  list: (projectId: number) => [...noteKeys.lists(), projectId] as const,
  details: () => [...noteKeys.all, 'detail'] as const,
  detail: (id: number) => [...noteKeys.details(), id] as const,
};

// Hooks
export const useNotes = (projectId: number) => {
  return useQuery({
    queryKey: noteKeys.list(projectId),
    queryFn: () => apiClient.getNotesByProject(projectId),
    enabled: !!projectId,
  });
};

export const useNote = (noteId: number) => {
  return useQuery({
    queryKey: noteKeys.detail(noteId),
    queryFn: () => apiClient.getNote(noteId),
    enabled: !!noteId,
  });
};

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateNoteApi) => apiClient.createNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: noteKeys.lists() });
    },
  });
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Note) => apiClient.updateNote(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: noteKeys.lists() });
      queryClient.invalidateQueries({ queryKey: noteKeys.detail(variables.id) });
    },
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (noteId: number) => apiClient.deleteNote(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: noteKeys.lists() });
    },
  });
};
