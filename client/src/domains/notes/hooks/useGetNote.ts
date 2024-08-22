import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { ApiClientContext } from "../../../provider/apiClientProvider";

export const useGetNote = (noteId: number) => {
  const { apiClient } = useContext(ApiClientContext);

  const { data, isLoading } = useQuery({
    queryKey: ["notes", { noteId }],
    queryFn: () => apiClient.getNote(noteId),
  });

  return { data: data || {}, isLoading };
};
