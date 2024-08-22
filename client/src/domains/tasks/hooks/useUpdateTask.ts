import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { queryClient } from "../../..";
import { ApiClientContext } from "../../../provider/apiClientProvider";
import { useToasts } from "../../../provider/toastProvider";
import { Task } from "../../../types";

export const useUpdateTask = () => {
  const { apiClient } = useContext(ApiClientContext);
  const { pushToast } = useToasts();

  const {
    mutate: updateTask,
    error,
    data,
  } = useMutation({
    mutationFn: (data: Task) => apiClient.editTask(data),
    onSuccess: (result) => {
      pushToast({
        title: "Task edited",
        message: result.title,
      });
      queryClient.invalidateQueries({
        queryKey: ["tasks", { taskId: result.id }],
      });
      queryClient.invalidateQueries({
        queryKey: ["tasks", { projectId: result.project.id }],
      });
    },
  });

  return { updateTask, error, data };
};
