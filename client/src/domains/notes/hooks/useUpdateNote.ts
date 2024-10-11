import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { queryClient } from "../../..";
import { ApiClientContext } from "../../../provider/apiClientProvider";
import { Note } from "../../../types";

export const useUpdateNote = () => {
  const { apiClient } = useContext(ApiClientContext);

  const { mutate: updateNote } = useMutation({
    mutationFn: (data: Note) => apiClient.editNote(data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: ["notes", { noteId: result.id }],
      });
      queryClient.invalidateQueries({
        queryKey: ["notes", { projectId: result.project.id }],
      });
    },
  });
  return { updateNote };
};
