import { useCallback, useContext, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { ApiClientContext } from "../../provider/apiClientProvider";
import { currentFeatureContext } from "../../provider/currentFeatureProvider";
import { Project } from "../../types";
import { IconButton } from "../Button";
import { Loader } from "../Loader";
import { PageHeader } from "../PageHeader";
import { ProjectItem } from "../Project";

export const Projects: React.FC<{
  newProjecthandler: () => void;
  setProjectToEdit: (project: Project) => void;
}> = ({ newProjecthandler, setProjectToEdit }) => {
  const querykey = ["projects"];

  const { feature } = useContext(currentFeatureContext);
  const { apiClient } = useContext(ApiClientContext);
  const { pathname } = useLocation();

  const { isLoading, data, refetch } = useQuery([querykey, feature], () =>
    apiClient.getProjects(feature)
  );

  const projects = data || [];

  const isActive = useCallback(
    (id: number) => {
      const filteredPath = pathname.split("/");

      return (
        id.toString() ===
        filteredPath[filteredPath.length === 3 ? filteredPath.length - 1 : 2]
      );
    },
    [pathname]
  );

  useEffect(() => {
    if (!feature) return;
    refetch();
  }, [feature, refetch]);

  return (
    <div className="project-sidebar">
      <PageHeader>
        <span>Projects</span>
        <IconButton handler={newProjecthandler}>
          <AiOutlinePlus />
        </IconButton>
      </PageHeader>

      {isLoading && (
        <div className="flex justify-content-center mt-2">
          <Loader />
        </div>
      )}
      <div className="project-list">
        {projects.map((project: Project) => (
          <ProjectItem
            key={project.id}
            project={project}
            active={isActive(project.id)}
            setProjectToEdit={setProjectToEdit}
            feature={feature}
          />
        ))}
      </div>
    </div>
  );
};
