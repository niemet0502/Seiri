import { useCallback, useState } from "react";
import { ProjectModal } from "../../pages/Project/ProjectModal";
import { Project } from "../../types";
import { Deferred } from "../../utils/Deferred";
import { Features } from "./Features";
import { Projects } from "./Project";

export const Sidebar: React.FC = () => {
  const [newProjectHandler, setNewProjectHandler] = useState<Deferred<void>>();
  const [projectToEdit, setProjectToEdit] = useState<Project>();

  const addNewProject = useCallback(async () => {
    const deferred = new Deferred<void>();

    setNewProjectHandler(deferred);

    try {
      await deferred.promise;
    } catch (e) {
    } finally {
      setNewProjectHandler(undefined);
    }
  }, []);

  const editProject = useCallback(async (project: Project) => {
    const deferred = new Deferred<void>();

    setProjectToEdit(project);
    setNewProjectHandler(deferred);

    try {
      await deferred.promise;
    } catch (e) {
    } finally {
      setNewProjectHandler(undefined);
      setProjectToEdit(undefined);
    }
  }, []);

  return (
    <>
      <Features />
      <Projects
        newProjecthandler={addNewProject}
        setProjectToEdit={editProject}
      />

      {newProjectHandler && (
        <ProjectModal
          deferred={newProjectHandler}
          projectToEdit={projectToEdit}
        />
      )}
    </>
  );
};
