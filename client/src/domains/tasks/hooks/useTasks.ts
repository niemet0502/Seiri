import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { ApiClientContext } from "../../../provider/apiClientProvider";

export const useTasks = (projectId: number, showCompleted: boolean) => {
  const { apiClient } = useContext(ApiClientContext);

  const { isLoading, data } = useQuery({
    queryKey: ["tasks", { projectId, showCompleted }],
    queryFn: () => apiClient.getTasksByProject(projectId, showCompleted),
  });

  return { isLoading, data };
};
