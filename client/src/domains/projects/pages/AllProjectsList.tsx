import { useState } from "react";
import { Project } from "../../../types";
import { Deferred } from "../../../utils/Deferred";
import { ProjectItems } from "../components/ProjectItems";
import { ProjectModal } from "../components/ProjectModal";
import { useProjects } from "../hooks/useProjects";

export const AllProjectsList: React.FC = () => {
  const { data: projects } = useProjects(true);

  const [projectHandler, setProjectHandler] = useState<Deferred<Project>>();
  const [projectToEdit, setProjectToEdit] = useState<Project>();

  const onCreate = async () => {
    const deferred = new Deferred<Project>();
    setProjectHandler(deferred);
    await deferred.promise;
    setProjectHandler(undefined);
  };

  const onEdit = async (project: Project) => {
    const deferred = new Deferred<Project>();

    setProjectToEdit(project);
    setProjectHandler(deferred);
    await deferred.promise;
    setProjectHandler(undefined);
    setProjectToEdit(undefined);
  };

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
                onEdit={onEdit}
                showBadge
              />
            ))}
        </div>
      </div>

      {projectHandler && (
        <ProjectModal deferred={projectHandler} projectToEdit={projectToEdit} />
      )}
    </div>
  );
};
