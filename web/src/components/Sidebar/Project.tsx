import { AiOutlinePlus } from "react-icons/ai";
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
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};
