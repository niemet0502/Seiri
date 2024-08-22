import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { queryClient } from "../../..";
import { ApiClientContext } from "../../../provider/apiClientProvider";
import { useToasts } from "../../../provider/toastProvider";

export const useRemoveTask = () => {
  const { apiClient } = useContext(ApiClientContext);
  const { pushToast } = useToasts();

  const { mutate: removeTask } = useMutation({
    mutationFn: (taskId: number) => apiClient.deleteTask(taskId),

    onSuccess: (result) => {
      pushToast({
        title: "Task deleted",
        message: "",
      });

      queryClient.invalidateQueries({
        queryKey: ["tasks", { projectId: result.project.id }],
      });

      if (result.parent.id) {
        queryClient.invalidateQueries({
          queryKey: ["tasks", { taskId: result.parent.id }],
        });
      }
    },
  });

  return { removeTask };
};
