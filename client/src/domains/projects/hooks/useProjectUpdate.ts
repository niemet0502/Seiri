import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { queryClient } from "../../..";
import { ApiClientContext } from "../../../provider/apiClientProvider";
import { currentFeatureContext } from "../../../provider/currentFeatureProvider";
import { Project } from "../../../types";

export const useUpdateProject = () => {
  const { feature } = useContext(currentFeatureContext);
  const { apiClient } = useContext(ApiClientContext);

  const { mutate: updateProject, error } = useMutation({
    mutationFn: (toUpdate: Project) => apiClient.editProject(toUpdate),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects", { feature }],
      });
    },
  });
  return { updateProject, error };
};
