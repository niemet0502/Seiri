import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { queryClient } from "../../..";
import { ApiClientContext } from "../../../provider/apiClientProvider";
import { useToasts } from "../../../provider/toastProvider";
import { CreateNoteApi } from "../../../types";

export const useCreateNote = (projectId: number) => {
  const { apiClient } = useContext(ApiClientContext);
  const { push } = useHistory();
  const { pushToast } = useToasts();

  const { mutate: createNote, error } = useMutation({
    mutationFn: (data: CreateNoteApi) => apiClient.createNote(data),

    onSuccess: (result) => {
      pushToast({
        title: "Note created",
        message: result.title,
      });
      queryClient.invalidateQueries({
        queryKey: ["notes", { projectId: result.project.id }],
      });
      push(`/projects/${projectId}/note/${result.id}`);
    },
  });

  return { createNote, error };
};
