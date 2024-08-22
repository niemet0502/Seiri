import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { queryClient } from "../../..";
import { ApiClientContext } from "../../../provider/apiClientProvider";
import { currentFeatureContext } from "../../../provider/currentFeatureProvider";
import { CreateProject } from "../../../types";

export const useCreateProject = () => {
  const { feature: handledObject } = useContext(currentFeatureContext);
  const { push } = useHistory();
  const { apiClient } = useContext(ApiClientContext);
  // const { pushToast } = useToasts();

  const { mutate: createProject } = useMutation({
    mutationFn: (data: CreateProject) => apiClient.addProject(data),

    onSuccess: (newProject) => {
      queryClient.invalidateQueries({
        queryKey: ["projects", { feature: handledObject }],
      });
      // pushToast({
      //   title: "Project created",
      //   message: newProject.name,
      // });
      push(`/project/${newProject.id}`);
    },
  });
  return { createProject };
};
