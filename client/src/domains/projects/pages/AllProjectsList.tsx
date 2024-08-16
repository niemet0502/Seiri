import { Project } from "../../../types";
import { ProjectItems } from "../components/ProjectItems";
import { useProjects } from "../hooks/useProjects";

export const AllProjectsList: React.FC = () => {
  const { data: projects } = useProjects(true);

  console.log(projects);

  return (
    <div className="flex page-content flex-2">
      <div className="tasks-list">
        <div className="flex page-header">
          <h2>My projects</h2>
        </div>

        <div className="project-list">
          {(projects || [])
            .filter((project: Project) => !project.isDefault)
            .map((project: Project) => (
              <ProjectItems
                key={project.id}
                project={project}
                active={false}
                showBadge
                // setProjectToEdit={setProjectToEdit}
                // feature={feature}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
