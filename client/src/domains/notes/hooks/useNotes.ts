import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { ApiClientContext } from "../../../provider/apiClientProvider";

export const useNotes = (projectId: number) => {
  const { apiClient } = useContext(ApiClientContext);

  const { data, isLoading } = useQuery({
    queryKey: ["notes", { projectId }],
    queryFn: () => apiClient.getNotesByProject(projectId),
  });
  return { data, isLoading };
};
