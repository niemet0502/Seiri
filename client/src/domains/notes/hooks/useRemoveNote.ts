import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { queryClient } from "../../..";
import { ApiClientContext } from "../../../provider/apiClientProvider";
import { useToasts } from "../../../provider/toastProvider";

export const useRemoveNote = () => {
  const { apiClient } = useContext(ApiClientContext);

  const { push } = useHistory();
  const { pushToast } = useToasts();

  const { mutate: removeNote, error } = useMutation({
    mutationFn: (id: number) => apiClient.deleteNote(id),
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: ["notes", { projectId: result.project.id }],
      });
      pushToast({
        title: "Note deleted",
        message: "",
      });
      push(`/projects/${result.project.id}`);
    },
  });
  return { removeNote, error };
};
