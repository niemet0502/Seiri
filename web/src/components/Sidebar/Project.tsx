import { useCallback } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { projects } from "../../utils/data";
import { IconButton } from "../Button";
import { PageHeader } from "../PageHeader";
import { ProjectItem } from "../Project";

export const Projects: React.FC<{ newProjecthandler: () => void }> = ({
  newProjecthandler,
}) => {
  // get the current feature
  // if it's note, fetch project that handle notes
  // or fetch project that handle tasks

  const { pathname } = useLocation();

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
      <div className="project-list">
        {projects.map((project) => (
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
