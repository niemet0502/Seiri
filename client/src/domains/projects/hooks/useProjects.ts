import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { ApiClientContext } from "../../../provider/apiClientProvider";
import { currentFeatureContext } from "../../../provider/currentFeatureProvider";

export const useProjects = (includeArchived: boolean) => {
  const { feature } = useContext(currentFeatureContext);
  const { apiClient } = useContext(ApiClientContext);

  const { error, isLoading, data } = useQuery({
    queryKey: ["projects", { feature, includeArchived }],
    queryFn: () => apiClient.getProjects(feature, includeArchived),
  });
  return { error, isLoading, data };
};
