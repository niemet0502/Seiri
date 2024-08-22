import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { ApiClientContext } from "../../../provider/apiClientProvider";

export const useGetProject = (projectId: number) => {
  const { apiClient } = useContext(ApiClientContext);
  const { data, error } = useQuery({
    queryKey: ["projects", { id: projectId }],
    queryFn: () => apiClient.getProject(projectId),
  });
  return { data, error };
};
