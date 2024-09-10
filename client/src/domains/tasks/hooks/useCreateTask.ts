import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { queryClient } from "../../..";
import { ApiClientContext } from "../../../provider/apiClientProvider";
import { CreateTaskApi } from "../../../types";

export const useCreateTask = () => {
  const { apiClient } = useContext(ApiClientContext);

  const { mutateAsync: createTask } = useMutation({
    mutationFn: (data: CreateTaskApi) => apiClient.createTask(data),
    onSuccess: (result) => {
      if (result.parent && result.parent.id) {
        queryClient.invalidateQueries({
          queryKey: ["tasks", { taskId: result.parent.id }],
        });
      }
      queryClient.invalidateQueries({
        queryKey: ["tasks", { projectId: result.project.id }],
      });
    },
  });
  return { createTask };
};
