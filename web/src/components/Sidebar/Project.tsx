import { useCallback, useContext } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { ApiClientContext } from "../../provider/apiClientProvider";
import { Project } from "../../types";
import { IconButton } from "../Button";
import { PageHeader } from "../PageHeader";
import { ProjectItem } from "../Project";

export const Projects: React.FC<{ newProjecthandler: () => void }> = ({
  newProjecthandler,
}) => {
  // get the current feature
  // if it's note, fetch project that handle notes
  // or fetch project that handle tasks
  const querykey = ["projects"];

  const { apiClient } = useContext(ApiClientContext);
  const { pathname } = useLocation();

  const { isLoading, data } = useQuery(querykey, () => apiClient.getProjects());

  const projects = data || [];

  const isActive = useCallback(
    (id: number) => {
      const filteredPath = pathname.split("/");
      return id.toString() === filteredPath[filteredPath.length - 1];
    },
    [pathname]
  );

  return (
    <div className="project-sidebar">
      <PageHeader>
        <span>Projects</span>
        <IconButton handler={newProjecthandler}>
          <AiOutlinePlus />
        </IconButton>
      </PageHeader>

      {isLoading && <p>isLoading</p>}
      <div className="project-list">
        {projects.map((project: Project) => (
          <ProjectItem
            key={project.id}
            project={project}
            active={isActive(project.id)}
          />
        ))}
      </div>
    </div>
  );
};
