import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { queryClient } from "../../..";
import { ApiClientContext } from "../../../provider/apiClientProvider";
import { currentFeatureContext } from "../../../provider/currentFeatureProvider";

export const useRemoveProject = () => {
  const { apiClient } = useContext(ApiClientContext);
  const { feature } = useContext(currentFeatureContext);

  const { mutate: removeProject, error } = useMutation({
    mutationFn: (id: number) => apiClient.removeProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects", { feature }],
      });
    },
  });
  return { removeProject, error };
};
