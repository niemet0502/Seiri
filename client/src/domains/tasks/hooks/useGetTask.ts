import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { ApiClientContext } from "../../../provider/apiClientProvider";

export const useGetTask = (taskId: number) => {
  const { apiClient } = useContext(ApiClientContext);

  const { data, isLoading } = useQuery({
    queryKey: ["tasks", { taskId }],
    queryFn: () => apiClient.getTask(taskId),
  });

  return { data, isLoading };
};
